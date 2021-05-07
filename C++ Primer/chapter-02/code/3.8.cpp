#include <iostream>
#include <string>

using namespace std;

int main()
{
  string str;
  getline(cin, str);
  int i = 0;
  while (str[i]!='\0')
  {
    str[i] = 'X';
    i++;
  }
  cout << str << endl;
  return 0;
}
