#1. Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then 
#the count.
cities = { "addis" , "hawassa" , "dera dawa" , "addis" , "hawassa" , "jimma" , "jimma"}
print (cities)
print (len(cities))
#2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to 
#print each on its own line.
grocery = { "milk":40 , "Tea":20 , "biskut":20 }
for item,price in grocery.items():
    print (f"{item}:{price} ETB")
#3. Tax comprehension. Given prices = [100, 250, 400, 80], use one comprehension to build 
#a list with 15% tax added. 
prices = [20, 50, 100, 150, 250, 300]
tax_added = [t * 1.15 for t in prices]
print(tax_added)
#4. Cheap items. From the same list, use a comprehension with a condition to keep only prices 
#under 200. 
prices = [20, 50, 100, 150, 250, 300]
cheap = [t for t in prices if t < 200]
print(cheap)
#5. Write & read. Write three customer names to names.txt, then open it and print each name 
#back, one per line. with open("names.txt", "r") as f:
with open("names.txt", "w") as f:
    f.write("A, Sara Dereje\n")
    f.write("B,Tigest Tadesse\n")
    f.write("C,Raniya Ayalew\n")
with open ("names.txt" , "r") as f:
    for line in f:
        print(line.strip())
    
#6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and 
#ZeroDivisionError.
try:
    number = int (input("enter a number: "))
    value = 1000 / number
except ValueError:
    print ("the number inserted is not an intiger")
except ZeroDivisionError:
    print("the number you inserted is not divisble")
else: 
    print (f"the result is {value}")
 
try:
    with open("day02.customer_report.py" , "r") as f: 
        for line in f: 
            print(line.strip()) 
except FileNotFoundError:
    print ("the file do not exist")
finally:
    print("done")
