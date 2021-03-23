function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function createListNode(arr) {
  let head = new ListNode();
  const node = head;
  for (let i = 0; i < arr.length; i++) {
    head.next = new ListNode(arr[i]);
    head = head.next;
  }
  return node.next;
}
