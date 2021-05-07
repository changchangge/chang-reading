#include <iostream>
#include <vector>

using namespace std;

// int main()
// {
//   int ci;
//   vector<int> result;
//   while (cin >> ci)
//   {
//     result.push_back(ci);
//   }
//   result.push_back(0);
//   for (int i = 0; i < result.size() - 1; i++)
//   {
//     cout << result[i] + result[i + 1] << endl;
//   }
//   return 0;
// }

int main()
{
  int ci;
  vector<int> result;
  while (cin >> ci)
  {
    result.push_back(ci);
  }
  for (decltype(result.size()) i = 0; i < result.size() / 2; i++)
  {
    cout << result[i] + result[result.size() - i -1] << " ";
  }
  if (result.size() % 2 != 0)
  {
    cout << result[result.size() / 2] << endl;
  }
  return 0;
}