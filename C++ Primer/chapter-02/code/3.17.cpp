#include <iostream>
#include <string>
#include <vector>
#include <cctype>

using namespace std;

int main()
{
  string s;
  vector<string> result;
  while (cin >> s)
  {
    if (s == "q")
    {
      break;
    }
    else
    {
      result.push_back(s);
    }
  }
  for (string::size_type i = 0; i < result.size(); i++)
  {
    for (auto &c : result[i])
    {
      c = toupper(c);
    }
    cout << result[i] << endl;
  }
}