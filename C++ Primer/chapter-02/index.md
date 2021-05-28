### 字符串、向量和数组
#### 命名空间的using声明
- 头文件不应包含using声明
#### 标准库类型string
```C++
#include <string>
using std::string;
string s1;
string s2 = s1;
string s3 = 'hiya';
string s4(10, 'c');
```
##### string对象上的操作
```C++
os<<s 
is>>s 
getline(is, s) 
s.empty()
s.size()
s[n]
s1+s2
s1=s2
s1==s2
s1!=s2
<,>,<=,>=
```
- 视同size函数，用auto
- 字符串字面值和标准库类型的string的对象不是同一个类型
- 迭代时，设置下标的类型总为string::size_type

#### 标准库类型vector
- vector是一个类模版
- 声明
```C++
#include <vector>
using std::vector;

vector<T> v1
vector<T> v2(v1)
vector<T> v2 = v1
vector<T> v3(n, val)
vector<T> v4(n)
vector<T> v5{a,b,c,...}
vector<T> v5={a,b,c,...}

v1.push_back();
v1.empty();
v1.size();
v[n];
v1 == v2; // v1和v2相等当且仅当它们的元素数量相同切对应位置的元素值都相同
```
- 如果循环体内部含有向vector对象添加元素的语句，则不能使用范围for循环

#### 迭代器
##### 使用迭代器
```C++
*iter
iter->mem
++iter
--iter
iter1 == iter2
iter1 != iter2
```
- 迭代与迭代之间没有加法只有减法，所以 mid = (beg + end) / 2 不合法。所以要是用 mid = beg + (end-beg) / 2

#### 数组
- 数组和vector不同点是数组是固定长度的。
```C++
const char a[12]="Hello World"; // '\0'空字符串
```
- 不允许拷贝和赋值
```C++
int *ptrs[10]; // ptrs是含有10个整型指针的数组
int (*Parray)[10] = &arr; // Parray是一个指向10个int数组的指针
int (&arrRef)[10] = arr; // arrRef是一个含有10个int指针的数组的引用
```
- 定义在全局空数组会被初始化，而定义在局部作用域的不会