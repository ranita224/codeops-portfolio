#1. Name the Big-O. For five short snippets (a list index, a single loop, a nested loop, a dict lookup, a binary search), write the Big-O of each as a comment and explain why. 
import time
from collections import deque
import bisect
my_list = list(range(1000))
my_dict = {i: i for i in range(1000)}
target = 999
# O(1) – list index
x = my_list[500]
# O(n) – single loop
for x in my_list:
    pass
# O(n^2) – nested loop
for a in my_list[:10]:
    for b in my_list[:10]:
        pass
# O(1) – dict lookup
value = my_dict[500]
# O(log n) – binary search
index = bisect.bisect_left(my_list, target)
print("Binary search index:", index)

#2. List vs. dict lookup. Build a list and a dict of 100,000 fake account numbers. Time how long it takes to find one near the end in each.

accounts_list = [f"ACC{i}" for i in range(100_000)]
accounts_dict = {f"ACC{i}": i for i in range(100_000)}
target = "ACC99999"
start = time.time()
found = target in accounts_list
print("List lookup time:", time.time() - start)
start = time.time()
found = target in accounts_dict
print("Dict lookup time:", time.time() - start)


#3. Build a stack. Write a Stack class with push, pop, and peek, and use it to reverse a list of names. 
class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)  # O(1)
    def pop(self):
        return self.items.pop()  # O(1)
    def peek(self):
        return self.items[-1] if self.items else None
names = ["Raniya", "Khalid", "Ayalew"]
stack = Stack()
for name in names:
    stack.push(name)
reversed_names = []
while stack.items:
    reversed_names.append(stack.pop())
print("Reversed names:", reversed_names)

# 4.Build a queue. Use collections.deque to model a bank service line: enqueue five customers, then serve them in order.
queue = deque()
for customer in ["A", "B", "C", "D", "E"]:
    queue.append(customer)
while queue:
    served = queue.popleft()  
    print("Serving:", served)


# 5.Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that walks the chain. 
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
class LinkedList:
    def __init__(self):
        self.head = None
    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node  # O(1)
    def print_all(self):
        current = self.head
        while current:
            print(current.data)
            current = current.next  # O(n)
ll = LinkedList()
for name in ["Raniya", "Khalid", "Ayalew"]:
    ll.push_front(name)

print("Linked list contents:")
ll.print_all()
