#include <iostream>
#include <string>

using namespace std;

int main()
{
  string str, result;
  getline(cin, str);
  int i = 0;
  while (str[i] != '\0')
  {
    if (!ispunct(str[i]))
    {
      result += str[i];
    };
    i++;
  }
  cout << result << endl;
  return 0;
}