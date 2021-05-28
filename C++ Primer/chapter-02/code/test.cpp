#include <iostream>
#include <vector>

using namespace std;

int main()
{
  vector<int> a = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  const int sought = 5;
  auto beg = a.begin();
  auto end = a.end();
  auto mid = beg + (end - beg) / 2;
  while (mid != end && *mid != sought)
  {
    if (sought < *mid)
    {
      end = mid;
    }
    else
    {
      beg = mid + 1;
    }
    mid = beg + (end - beg) / 2;
  }
  cout << *mid << endl;
}
