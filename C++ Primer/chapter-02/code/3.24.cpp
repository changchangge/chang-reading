#include <iostream>
#include <vector>

using namespace std;

// int main()
// {
//   vector<int> inputV;
//   int input;
//   while (cin >> input)
//   {
//     inputV.push_back(input);
//   }
//   if (inputV.cbegin() == inputV.cend())
//   {
//     return -1;
//   }
//   for (auto i = inputV.cbegin(); i != inputV.cend() - 1; i++)
//   {
//     cout << (*i + *(i + 1)) << " ";
//   }
//   if (inputV.size() % 2 != 0)
//   {
//     cout << *(inputV.cend() - 1) << endl;
//   }
//   else
//   {
//     cout << endl;
//   }
// }

int main()
{
  vector<int> inputV;
  int input;
  while (cin >> input)
  {
    inputV.push_back(input);
  }
  if (inputV.cbegin() == inputV.cend())
  {
    return -1;
  }
  auto beg = inputV.cbegin();
  auto end = inputV.cend();
  for (auto i = beg; i != (beg + (end - beg) / 2); i++)
  {
    cout << (*i + *(beg + (end - i) - 1)) << " ";
  }
  if (inputV.size() % 2 != 0)
  {
    cout << *(beg + (end - beg) / 2) << endl;
  }
  else
  {
    cout << endl;
  }
  return 0;
}
