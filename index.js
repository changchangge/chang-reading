console.log('prefetch js execute.');
const stroageShopId = my.getStorageSync('shopId');
console.log(stroageShopId);

if (stroageShopId) {
  my.call('sendMtop', {
    api: 'mtop.wdk.youxuan.page.queryIndexPage',
    v: '1.0',
    method: 'GET',
    data: {
      attribute: '{}',
      channelCode: 'hm',
      channelSource: 'taobao',
      orderTerminal: 'hmyx_taobao_applet',
      renderChannelCode: 'SG_TB_APPLETS',
      renderCustomTag: 'yx_tb_app',
      scenarioGroup: 'HEMA_YOUXUAN',
      shopIds: stroageShopId,
      shopIdsFromGeo: stroageShopId,
      source: 'taobao',
      terminal: 'hmyx_taobao_applet',
    },
    dataType: 'originaljson',
    needLink2Login: true,
    needLogin: false,
    needRetry: true,
    onlyLoginWhenNotLogin: false,
    secType: 0,
    sessionOption: 'AutoLoginOnly',
    timeout: 20000,
    ttid: 'wap_SG_HMYX_H5@yxtbhmxs_iPhone_4.51.0',
    __appxDomain: 'app',
  });
}
