#include <iostream>
#include <string>
#include <cctype>

using namespace std;

int main()
{
  string s = "hello world";
  for (auto i = s.begin(); i != s.end() && !isspace(*i); i++)
  {
    *i = toupper(*i);
  }
  cout << s << endl;
}
