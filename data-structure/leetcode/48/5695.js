function test(nums) {
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
}

var maxScore = function (nums) {
  const n = nums.length;
  const cnt = [0];
  for (let i = 1; i < 1 << n; i++) {
    cnt[i] = cnt[i >> 1] + (i & 1);
  }
  console.log(cnt)
};

maxScore([1,2,3])



import { createElement, useEffect, useState, useMemo, useCallback, useRef, Fragment } from 'rax';
import {
  registerNativeEventListeners,
  addNativeEventListener,
  removeNativeEventListener,
} from 'rax-app';
import Image from 'rax-image';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import { storeConnect } from '@alife/agro-store';
import classnames from 'classnames';
import NavBar from '@/components/NavBar';
import Commodity, { ReportFromEnum } from '@/components/Commodity';
import CommodityBtn from '@/components/CommodityBtn';
import LoadMore from '@/components/LoadMore';
import SettleBar from '@/components/SettleBar';
import themeColor from '@/theme/variables';

import service from './service';
import styles from './index.module.less';

import { ConfigKeys } from '@/service/const';
import ShoppingCartLoader from '../ShoppingCart/components/ShoppingCartLoader';
import { useSpm } from '@/hooks/loggerHook';
import { actionForGoldlog, appearLog } from '@/utils/log';
import AddBagAnimation from '@/components/AddBagAnimation';
import AgroUniversalApi from '@ali/agro-universal-api';
import { isWeChatMiniProgram } from 'universal-env';
import { ViewConfigForScreen } from '@/constants/view';
import useFlyweight from '@/hooks/useFlyweight';
import { noAction } from '@/constants/const';
import { isAlipayMiniapp } from '@ali/agro-universal-api/lib/utils/env';
import { Portal } from '@alife/community-common';
import GlobalNotice from '@/components/Notice/Global';
import createTTIPerformanceHook from '@/hooks/performanceHook';

const usePerformance = createTTIPerformanceHook();

const {
  ScreenTitle,
  SearchPlaceholder,
  LoadingMoreText,
  NoMoreContentText,
  NoCategoriesImg,
  NoCategoriesText,
} = ViewConfigForScreen['pages/Categories/index'];

interface IGetCategoriesParams {
  shopIds: string;
  // pagination: string;
  // catIds: string;
}

interface IGetItemsByCategoryParams {
  shopIds?: string;
  // cid for tb, catId for wx
  catId: string;
  catIds: string; // JSON格式化数据
  pagination?: string;
}

const formatCategories = (res) => ((res?.scenes || [])[0]?.content || [])[0]?.resources || [];

// const formatItems = (item: any) => item?.item || {};

const formatRes = item => {
  const childItem = item?.item || {}
  return {
    picUrl: childItem.picUrl,
    title: childItem.title,
    subTitle: childItem.subTitle,
    deliveryTime: childItem.deliveryTime,
    specification: childItem.specification,
    recentSellCount: childItem.recentSellCount,
    price: childItem.price,
    promotionPrice: childItem.promotionPrice,
    prePromotionPrice: childItem.prePromotionPrice,
    itemId: childItem.itemId,
    realInventory: childItem.realInventory,
    interactiveGameTags: childItem.interactiveGameTags,
    limitInfo: childItem.limitInfo,
    tagInfo: childItem.tagInfo,
    youxuanPromotion: childItem.youxuanPromotion,
    priceTagObj:childItem.priceTagObj,
    lmtInfo: childItem.lmtInfo,
  }
}

// 后端使用mock数据 mock shopIds: 151001052
const getCategories = ({ shopIds }: IGetCategoriesParams) =>
  service.getCategories({
    mockMtop: true,
    shopIds,
    ...ConfigKeys.getCategories,
  });

// 后端使用mock数据 shopIds: 151001052
export const getItemsByCategory = ({
  shopIds,
  catId,
  catIds,
  pagination,
}: IGetItemsByCategoryParams) =>
  service.getItemsByCategoryId({
    shopIds,
    catId: catId.toString(),
    catIds,
    pagination,
    mockMtop: true,
    ...ConfigKeys.getItemsByCategory,
  });

const BufferPagination = 10;
const PaginationSuffix = '1';
const initPagination = -1;

let cachedCategories;
let cachedShopId;

// TODO: 跳类目带index参数
function Categories(props) {
  useSpm('8454515');

  // const { addBag } = props.useAgroStore('shoppingCart');
  const {
    state: { stationDetail },
  } = props.useAgroStore('station');
  const {
    state: { anchorCatId },
    setGlobalData,
  } = props.useAgroStore('global');

  const [cate, setCate] = useState([]);
  const cateRef = useRef<any>([]);
  cateRef.current = cate;
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // const [pagination, setPagination] = useState(initPagination);
  const shopId = useMemo(() => stationDetail?.shopId, [stationDetail]);
  const renderMixFixRef = useRef({
    shopId,
    pagination: initPagination,
    lastItemCatId: '',
    hasMore: true,
  });
  renderMixFixRef.current.shopId = shopId;
  const [tabIndex, setTabIndex] = useState(0);
  // 一级缓存
  const [itemList, setItemList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // 为后端全量接口做的数据窗口
  const [flyweightList, onVirtualLoadmore] = useFlyweight({
    cacheList: itemList,
    setLoading,
    setHasMore,
  });

  const [childCate, setChildCate] = useState([]);
  const [childCateIndex, setChildCateIndex] = useState(0);

  const [cartId] = useState(() => `id${String(Math.random()).slice(2)}-category-settleBar-card`);

  usePerformance(itemList);

  const getItems = (
    targetCat: any,
    shopId,
    forceReload?: boolean,
    callback?: (boolean) => void,
    lastItemCatId?: string
  ) => {
    if (targetCat) {
      const { pagination } = renderMixFixRef.current;
      const newPag = forceReload ? initPagination : pagination;
      setLoading(true);
      getItemsByCategory({
        catId: lastItemCatId || targetCat?.catId || targetCat?.cid,
        catIds: JSON.stringify([targetCat]),
        shopIds: shopId,
        pagination: `${newPag}-${
          (targetCat?.totalItemCount || 0) + BufferPagination
        }-${PaginationSuffix}`,
      })
        .then((res) => {
          const resList = (res?.dataList || []).map(formatRes) || [];
          // const resList = res?.dataList || [];
          const newList = forceReload ? resList : [...itemList, ...resList];
          renderMixFixRef.current.hasMore = false;
          setHasMore(false);
          setItemList(newList);
          if (newList?.length > 0) {
            renderMixFixRef.current.pagination = newList[newList?.length - 1]?.index;
            renderMixFixRef.current.lastItemCatId =
              newList[newList?.length - 1]?.catId || newList[newList?.length - 1]?.cid;
          }
          typeof callback === 'function' && callback(true);
          setLoading(false);
        })
        .catch(() => {
          renderMixFixRef.current.hasMore = false;
          setHasMore(false);
          typeof callback === 'function' && callback(false);
          setLoading(false);
        });
    }
  };

  const handleCategoriesData = (res) => {
    const categories = formatCategories(res);

    renderMixFixRef.current.pagination = initPagination;
    renderMixFixRef.current.lastItemCatId = '';

    // const catIds = JSON.parse(res.catIds);
    let initTabIndex = 0;
    let childCateIndex = 0;
    if (anchorCatId) {
      categories.some((category, i) => {
        if (category.catId == anchorCatId) {
          initTabIndex = i;
          return true;
        }
        return category.childCatDO.some((childCat, j) => {
          if (childCat.catId == anchorCatId) {
            initTabIndex = i;
            childCateIndex = j;
            return true;
          }
          return false;
        });
      });

      setGlobalData({ anchorCatId: 'none' });
    }

    const childCate = categories[initTabIndex]?.childCatDO;
    setChildCate(childCate);
    setCate(categories);
    // setItemList([]);
    if (categories[initTabIndex]) {
      setTabIndex(initTabIndex);
      setChildCateIndex(childCateIndex);
      getItems(childCate[childCateIndex], shopId, true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shopId == undefined || (cachedShopId === shopId && anchorCatId === 'none')) return;

    setItemList([]);

    if (cachedCategories && cachedShopId === shopId) {
      setTimeout(() => {
        handleCategoriesData(cachedCategories);
      }, 300);
      return;
    }

    cachedShopId = shopId;

    getCategories({ shopIds: shopId })
      .then((res) => {
        cachedCategories = res;
        handleCategoriesData(cachedCategories);
      })
      .catch(() => {
        setLoading(false);
        console.warn('类目请求出错');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, anchorCatId]);

  useEffect(() => {
    const onTabItemTap = () => {
      actionForGoldlog('.tabbar.classify');
    };

    addNativeEventListener('onTabItemTap', onTabItemTap);
    return () => {
      removeNativeEventListener('onTabItemTap', onTabItemTap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitchCate = (index) => {
    actionForGoldlog(`.category.${index + 1}`, 'CLK');
    setLoading(true);
    setTabIndex(index);
    renderMixFixRef.current.pagination = initPagination;
    renderMixFixRef.current.lastItemCatId = '';
    setItemList([]);
    const targetCat: any = cate[index];
    const targetChildCate = targetCat.childCatDO;
    setChildCate(targetChildCate);
    setChildCateIndex(0);
    const { shopId: shopIdRef } = renderMixFixRef.current;
    getItems(targetChildCate[0], shopIdRef, true);
  };
  const handleSearch = () => {
    actionForGoldlog('.search.search');
    AgroUniversalApi.navigateTo({
      url: `/pages/Search/index?stationId=`,
      spmString: '.search.search',
    });
  };
  const loadMoreRef = useRef<boolean>(false);
  const loadMore = () => {
    if (!renderMixFixRef.current.hasMore || loadMoreRef.current) return;
    loadMoreRef.current = true;
    const { shopId: shopIdRef, lastItemCatId } = renderMixFixRef.current;
    getItems(
      cate[tabIndex],
      shopIdRef,
      false,
      () => {
        loadMoreRef.current = false;
      },
      lastItemCatId
    );
  };
  const onGetnavbarheight = (e) => {
    if (isNaN(e)) return;
    setNavBarHeight(e);
  };

  const handleClickChildCate = (i) => {
    setChildCateIndex(i);
    const { shopId: shopIdRef } = renderMixFixRef.current;
    setItemList([]);
    getItems(childCate[i], shopIdRef, true);
  };

  const [hasSettleBar, setSettleBarFlag] = useState(false);
  // FIXME: viewHeight 不能用 flex 1 么?
  const [hasNotice, setHasNotice] = useState(false);

  const viewHeight = `100vh - ${navBarHeight}px - ${hasSettleBar ? 126 : 0}rpx - ${
    hasNotice ? 60 : 0
  }rpx`;
  const scrollContentHeight = `calc(${viewHeight} - ${97 * cate?.length}rpx)`;
  // const viewHeight = `100vh - ${navBarHeight}px - 120rpx`;
  // const scrollContentHeight = `calc(${viewHeight} - ${48 * 10}rpx)`;
  const disableTabScroll = cate?.length < 10;
  const navBarKeyRef = useRef<any>(100);
  if (!shopId) {
    return (
      <View className={styles.noData}>
        <Image
          className={styles.noDataImg}
          source={{ uri: 'https://gw.alicdn.com/tfs/TB1IQpO0eL2gK0jSZFmXXc7iXXa-361-352.png' }}
        />
        <View className={styles.noDataText}>请先前往首页选择自提点</View>
      </View>
    );
  }

  navBarKeyRef.current++;

  return (
    <Portal.Host>
      <View className={styles.Categories} catchtouchmove="return">
        {/** FIXME: 这里页面阿里和淘宝的页面渲染在切换tab时会跳动, iphone8和部分ios偶现navbar消失 */}
        <NavBar
          key={isWeChatMiniProgram ? `category-navbar-${navBarKeyRef.current}` : ''}
          // key={`category-navbar-${navBarKeyRef.current}`}
          extClass={isWeChatMiniProgram ? '' : styles.fixedNavBar}
          fullCustom
          // backgroundColorTop="#e9edf1"
          background={themeColor.primary}
          onGetnavbarheight={onGetnavbarheight}
          back={AgroUniversalApi._ENV_.isTaobaoMiniapp}
          backType="backHome"
        >
          <View className={styles.nav}>
            <View className={styles.navTitle} style={{ height: '39rpx' }}>
              {ScreenTitle}
            </View>
            <View
              className={styles.navSearch}
              onClick={handleSearch}
              // style={isWeChatMiniProgram ? { marginLeft: 24 } : {}}
            >
              <View className={styles.navSearchInner}>
                <i className="iconfont">&#xe617;</i>
                {SearchPlaceholder}
              </View>
            </View>
          </View>
        </NavBar>
        <View
          className={styles['empty-header']}
          style={{ height: `${navBarHeight}px` }}
          x-if={!isWeChatMiniProgram}
        >
          {/* <View className={styles.nav}>
          <View className={styles.navTitle} style={{ width: '154rpx', height: '39rpx' }}>
            {ScreenTitle}
          </View>
          <View
            className={styles.navSearch}
            onClick={handleSearch}
            style={isWeChatMiniProgram ? { marginLeft: 24 } : {}}
          >
            <View className={styles.navSearchInner}>
              <i className="iconfont">&#xe617;</i>
              {SearchPlaceholder}
            </View>
          </View>
        </View> */}
        </View>
        <GlobalNotice
          onNoticeChange={(notice) => {
            setHasNotice(!!notice);
          }}
        />

        <View
          x-if={cate?.length > 0}
          className={classnames({
            [styles.content]: true,
          })}
          style={{
            height: `calc(${viewHeight})`,
          }}
          catchtouchmove={noAction}
        >
          <ScrollView
            className={classnames({
              [styles.tabs]: true,
            })}
            showsVerticalScrollIndicator={false}
            catchtouchmove={noAction}
            disableScroll={disableTabScroll}
          >
            {(cate || []).map((v: any, i) => (
              <View className={styles.tabContainer}>
                <View
                  className={classnames({
                    [styles.tab]: true,
                    [styles.tabActive]: tabIndex === i,
                    [styles.tabActiveLast]: tabIndex - 1 === i,
                    [styles.tabActiveNext]: tabIndex + 1 === i,
                  })}
                  onClick={() => handleSwitchCate(i)}
                  key={`category-item-${i}`}
                  onFirstAppear={() => appearLog(`.category.${i + 1}`, `catid=${v.catId}`)}
                >
                  {v?.title?.length > 4 ? `${v?.title?.slice(0, 4)}...` : v?.title}
                </View>
              </View>
            ))}
            <View
              style={{
                height: scrollContentHeight,
                minHeight: hasSettleBar ? '30rpx' : undefined,
                backgroundColor: '#FFFFFF',
                position: 'relative',
              }}
            >
              <View
                style={{ width: '100%', height: '100%', backgroundColor: '#e9edf1' }}
                className={classnames({
                  [styles.tabActiveNext]: tabIndex + 1 === cate?.length,
                })}
              />
            </View>
          </ScrollView>
          <View className={styles.rightBlock}>
            <ScrollView
              x-if={childCate && childCate.length > 1}
              className={styles.childCateList}
              horizontal
            >
              {childCate.map((val: any, i) => (
                <View
                  key={i}
                  className={classnames({
                    [styles.childCate]: true,
                    [styles.childCateSelected]: i === childCateIndex,
                  })}
                  onClick={() => handleClickChildCate(i)}
                >
                  {val.title}
                </View>
              ))}
              {/* 最后一个childCate设margin-right没用，所以专门用个元素 */}
              <View className={styles.childCateRight} />
            </ScrollView>
            <ScrollView
              className={styles.itemList}
              key={tabIndex}
              showsVerticalScrollIndicator={false}
              // onEndReached={loadMore}
              onEndReached={onVirtualLoadmore}
              // refresher-enabled
              // onScrollViewRefresherPulling={onScrollToUpper}
              // onScrollViewRefresherRefresh={onScrollToUpper}
              onEndReachedThreshold={500}
            >
              {/* {itemList.map((val, i) => ( */}
              {(flyweightList || []).map((val, i) => (
                <Fragment>
                  <Commodity
                    reportFrom={`.${ReportFromEnum.Categories}.${tabIndex + 1}_${i + 1}`}
                    // style={{ marginTop: '12rpx' }}
                    imageStyle={{ height: '200rpx', width: '200rpx' }}
                    data={val}
                    key={`entry-item-${i}`}
                    showSubTitle={false}
                    hasNoImgCache
                    renderButton={
                      <CommodityBtn
                        addBagParams={
                          props.stack
                            ? {
                                animationEndElement: `#${cartId}`,
                              }
                            : {
                                animationEndElement: `#${cartId}`,
                              }
                        }
                        className={styles['categories-btn']}
                        data={val}
                        reportFrom={`.${ReportFromEnum.Categories}.${tabIndex + 1}_${i + 1}`}
                      />
                    }
                  />
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ height: '1px', width: 343, backgroundColor: '#EEEEEE' }} />
                  </View>
                </Fragment>
              ))}
              <LoadMore loadText="" loading={loading || hasMore || flyweightList?.length === 0} />
            </ScrollView>
            <View className={styles.rightBlockBottom} />
          </View>
        </View>
        <SettleBar
          key={`category-settle-bar-${navBarKeyRef.current}`}
          // x-if={hackRaxRefresh}
          showTabs={!!props.stack}
          cardTabId={cartId}
          onShow={setSettleBarFlag}
        />
        <View
          x-if={cate?.length === 0 && !loading}
          style={{ height: `calc(100vh - ${navBarHeight}px - 120px)`, justifyContent: 'center' }}
        >
          <Image source={{ uri: NoCategoriesImg }} className={styles['cate-img']} />
          <View className={styles['empty-title']}>{NoCategoriesText}</View>
        </View>
        <ShoppingCartLoader x-if={!props.stack} />
        <AddBagAnimation />
      </View>
    </Portal.Host>
  );
}

registerNativeEventListeners(Categories, ['onTabItemTap']);

export default storeConnect(Categories);
