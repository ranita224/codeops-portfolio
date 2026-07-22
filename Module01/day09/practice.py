#1. Build a BST. Write a Node class and an insert(root, value) function. Insert several balances,then print them with an in-order traversal — they should come out sorted. 
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root
def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)
values = [7, 3, 9, 1, 5, 8, 10]
root = None
for v in values:
    root = insert(root, v)
print("BST In-order Traversal:")
inorder(root)
#2.Tree depth. Write a recursive height(node) that returns the depth of a binary tree. 
def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))
print("Tree Depth:", height(root))
#3. Graph BFS. Given an adjacency-list graph, implement bfs(graph, start) and return the set of reachable vertices. 
from collections import deque
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            queue.extend(graph[node])
    return visited
graph = {'A': ['B', 'C'], 'B': ['D', 'E'],    'C': ['F'],    'D': [], 'E': [], 'F': []}
print("Graph BFS:", bfs(graph, 'A'))
#4. Graph DFS. Implement dfs(graph, start) recursively, and compare the visit order with your BFS.
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited
print("Graph DFS:", dfs(graph, 'A'))
#5. Priority queue. Use heapq to push five (priority, task) tuples in mixed order, then pop them all they should come out by priority.
import heapq
tasks = [(3, 'write report'), (1, 'email client'),(4, 'team meeting'), (2, 'code review'), (5, 'backup data')]
heapq.heapify(tasks)
print("Priority Queue Output:")
while tasks:
    print(heapq.heappop(tasks))
