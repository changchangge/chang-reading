#include <iostream>
#include <string>
#include <vector>

using namespace std;

void getIntSize(const vector<int> &s)
{
  cout << "size is " << s.size() << endl;
  for (string::size_type i = 0; i < s.size(); i++)
  {
    cout << s[i] << " ";
  }
  cout << endl;
}

void getStringSize(const vector<string> &s)
{
  cout << "size is " << s.size() << endl;
  for (string::size_type i = 0; i < s.size(); i++)
  {
    cout << s[i] << " ";
  }
  cout << endl;
}

int main()
{
  vector<int> v1;              // 0
  vector<int> v2(10);          // 10
  vector<int> v3(10, 42);      // 10
  vector<int> v4(10);          // 10
  vector<int> v5{10, 42};      // 2
  vector<string> v6(10);       // 10
  vector<string> v7{10, "hi"}; //10
  getIntSize(v1);
  getIntSize(v2);
  getIntSize(v3);
  getIntSize(v4);
  getIntSize(v5);
  getStringSize(v6);
  getStringSize(v7);
  return 0;
}