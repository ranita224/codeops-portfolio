#1. Recursive sum. Write a recursive total(nums) that sums a list, and a recursive count_down(n) that prints n down to 1. 
def total(nums):
    if not nums:              
        return 0
    return nums[0] + total(nums[1:])  
def count_down(n):
    if n <= 0:              
        return
    print(n)
    count_down(n - 1)        
print("Recursive total:", total([1, 2, 3, 4])) 
print("Countdown:")
count_down(5)
#2.  Binary search. Implement binary_search(items, target) on a sorted list and return the index,or -1. Test it on a sorted list of balances. 
def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
balances = [100, 200, 300, 400, 500, 600]
print("Binary search (400):", binary_search(balances, 400))  # 3
print("Binary search (250):", binary_search(balances, 250))  # -1
#3. Merge sort. Implement merge_sort(items) and its merge helper. Confirm it matches sorted() 
#on random lists.
def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
nums = [5, 2, 9, 1, 7]
print("Merge sort:", merge_sort(nums))  # [1, 2, 5, 7, 9]
#4. Sort with a key. Given a list of (name, balance) tuples, sort it by balance descending using sorted(key=...). 
def sort_by_balance(data):
    return sorted(data, key=lambda x: x[1], reverse=True)
people = [("Alice", 500), ("Bob", 200), ("Cara", 800)]
print("Sorted by balance:", sort_by_balance(people))
#Two pointers. Write has_pair(nums, target) for a sorted list, returning whether two values 
#sum to the target.
def has_pair(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return True
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return False
sorted_nums = [1, 2, 3, 4, 6, 8, 10]
print("Has pair (target=10):", has_pair(sorted_nums, 10)) 
print("Has pair (target=5):", has_pair(sorted_nums, 5))   
print("Has pair (target=20):", has_pair(sorted_nums, 20))  
