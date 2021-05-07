### 变量与基本类型

#### 基本内置类型

##### 算术类型
- bool char wchar_t char16_t char32_t short int long long long float double long double
- signed unsigned

##### 类型转换
- 含无符号类型的表达式

##### 字面值常量
- 字符和字符串
- u U L u8

#### 变量
##### 变量声明与定义
- extern关键字是变量声明。(全局)
- 变量声明与定义相比，定义会创建存储空间。

##### 标识符
- 不能连续两个_
- 不能_加大写字母开头
- 函数体外不能以_开头

#### 复合类型

##### 引用
- 一般以&开头，非值拷贝，引用必须初始化，引用相当于别名
- 引用只能绑定在对象上，而不能与字面值或者某个计算结果绑定


##### 指针
- 指针和引用相比。（1）指针本身就是一个对象，允许对指针赋值和拷贝
- 初始化空指针 nullntr
- void* void指针就是不定对象的

##### 复合类型的声明
- 指向指针的指针
```C++
int ival = 1024;
int *pi = &ival;
int **ppi = &pi;
```

#### const限定符
- extern全局，h文件声明
- const 指针
- 常量指针必须初始化，引用不是对象，不可以让引用不变
- 引用 常量引用 指针 常量指针 指针常量
```C++
  int i = 1024;
  const int *const d = &i;
  int *const k = &i;
```
- p is a  * point to 从右到左

##### 顶层const & 底层const
- 指针本身是一个常量
- 指针所指为对象

##### constexpr和常量表达式
- 如果认定一个变量为常量表达式，那就把它声明成constexpr

#### 处理类型
##### 类型别名
- typedef关键字
- 别名声明
```C++
using SI = Sales_item;
```
##### decltype auto关键字
对于 decltype 所用的表达式来说，如果变量名加上一对括号，得到的类型与不加括号时会有不同。具体来说，如果 decltype 使用的是一个不加括号的变量，则得到的结果就是该变量的类型；如果给变量加上了一层或多层括号，编译器就会把它当成一个表达式，从而推断得到引用类型。
auto 和 decltype 的区别主要有三方面：

- auto 类型说明符用编译器计算变量的初始值来推断其类型，而 decltype 虽然也让编译器分析表达式并得到它的类型，但是不实际计算表达式的值。
- 编译器推断出来的 auto 类型有时候和初始值的类型并不完全一样，编译器会适当地改变结果类型使其更符合初始化规则。例如，auto 一般会忽略掉顶层 const，而把底层 const 保留下来。与之相反，decltype 会保留变量的顶层 const。
- 与 auto 不同，decltype 的结果类型与表达式密切相关，如果变量名加上了一对括号，则得到的类型与不加括号时会有不同。如果 decltype 使用的是一个不加括号的变量，则得到的结果就是该变量的类型；如果给变量加上了一层或多层括号，则编译器将推断得到引用类型。

### 自定义数据结构
#### 定义Sales_data类型
```C++
struct Sales_data {
  std::string bookNo;
  unsigned units_sold = 0;
  double revenue = 0.0;
};
```

#### 预处理器
- ifdef idndef define endif

