/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let head = new ListNode();
  let temp = 0,
    l1Temp = l1,
    l2Temp = l2;
  const result = head;
  while (l1Temp !== null || l2Temp !== null) {
    let inTemp = temp;
    if (l1Temp === null) {
      temp = l2Temp.val + inTemp >= 10 ? 1 : 0;
      head.next = new ListNode((l2Temp.val + inTemp) % 10);
      l2Temp = l2Temp.next;
    } else if (l2Temp === null) {
      temp = l1Temp.val + inTemp >= 10 ? 1 : 0;
      head.next = new ListNode((l1Temp.val + inTemp) % 10);
      l1Temp = l1Temp.next;
    } else {
      temp = l1Temp.val + l2Temp.val + inTemp >= 10 ? 1 : 0;
      head.next = new ListNode((l1Temp.val + l2Temp.val + inTemp) % 10);
      l1Temp = l1Temp.next;
      l2Temp = l2Temp.next;
    }
    head = head.next;
  }
  if (temp === 1) {
    head.next = new ListNode(1);
    head = head.next;
  }
  return result.next;
};

