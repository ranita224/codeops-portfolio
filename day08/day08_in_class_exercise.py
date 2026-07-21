def linear_search (item, target):
    for i, x in enumerate(item):
       if x == target: 
        return i 
  
balance = [ 100 , 289 , 567 , 756 ]
print(linear_search( balance ,567))
def binary_search (item , target):
    lo,hi = 0 , len(item) - 1 
    while lo <= hi:
        mid = (lo + hi) // 2
        if item [mid] == target:
            return mid 
        elif item[mid] < target:
            lo = mid + 1
        elif item [mid] > target:
            hi = mid - 1
   
   
balance = [ 100 , 289 , 456 , 500 , 567 , 600 , 756]
print(binary_search(balance,500))       
