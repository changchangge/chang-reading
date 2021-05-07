#include <iostream>
#include <string>

using namespace std;

int main()
{
  string str;
  getline(cin, str);
  for (auto &s : str)
  {
    s = 'X';
  }
  cout << str << endl;
  return 0;
}