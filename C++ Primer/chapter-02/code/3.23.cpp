#include <iostream>
#include <vector>

using namespace std;

int main()
{
  vector<int> a;
  for (int i = 0; i < 10; i++)
  {
    a.push_back(i);
  }
  for (auto i = a.begin(); i != a.end(); i++)
  {
    *i = *i * 2;
  }
  for (auto i = a.begin(); i != a.end(); i++)
  {
    cout << *i << " ";
  }
  cout << endl;
}