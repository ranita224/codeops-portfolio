#Question 1 A.
def getOnlyEvens(numbers):
    result = []
    for i,x in enumerate(numbers):
        if x % 2 == 0 and i % 2 == 0:
            result.append(x)
    return result
number1= getOnlyEvens([1, 2, 3, 6, 4, 8])
number2 = getOnlyEvens([0, 1, 2, 3, 4])
print(number1)
print(number2)
#Question 2
def reverseCompare(number):
        reversed_num = int(str(number)[::-1]) 
        if number > reversed_num:
            return "Ok"
        elif reversed_num > number:
            return "Not Ok"
number1 =reverseCompare(72)
number2 = reverseCompare(23)
print (number1)
print(number2)
#Question 3
def factorial(i):
        if i  == 0:
            return 1
        return  i * factorial(i - 1)
number1 = factorial(5)
number2 = factorial(6)
number3 = factorial(0)
print(number1)
print(number2)
print(number3)
#Question 4 (Meera array)
def checkMeera(arr):
    for n in arr:
        if n * 2 in arr:
            print("I am NOT a Meera array")
            return
    print("I am a Meera array")
checkMeera([10, 4, 0, 5])      
checkMeera([7, 4, 9]) 
checkMeera([1, -6, 4, -3])
#Question 5 (Dual array)
def isdual(arr):
    for n in arr:
        if arr.count(n) != 2:
            return 0
    return 1
a = isdual([2,6,4,6,7,4,2,7])
b = isdual([5,8,7,7,8])
print(a)
print(b)
#Question 6
def digitalClock(sec):
    hours = (sec // 3600) % 24
    minutes = (sec % 3600) // 60
    secs = sec % 60
    return f"{hours:02}:{minutes:02}:{secs:02}"
print(digitalClock(61201))   
print(digitalClock(87000)) 
print(digitalClock(5025))
