#include <iostream>
#include <vector>

using namespace std;

int main()
{
  vector<unsigned> vUS(11);
  auto it = vUS.begin();
  unsigned iVal;
  while (cin >> iVal)
  {
    if (iVal <= 100)
    {
      ++*(it + iVal / 10);
    }
  }
  for (; it != vUS.end(); it++)
  {
    cout << *it << " ";
  }
  cout << endl;
  return 0;
}