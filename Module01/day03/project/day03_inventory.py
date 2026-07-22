stock = {}
try:
    with open("day03_stock.txt" , "r") as f:
        for line in f:
            item,quantity = line.strip().split(",")
            stock[item] = int(quantity)
    print (stock)
except FileNotFoundError:
    print ("The file you enter does not exist")
amount = 150
def adjust(item, amount):
    stock[item] = stock.get(item, 0) - amount
for item in list(stock.keys()):
    adjust(item, amount)   
print("Updated stock:", stock)
low = [item for item, quantity in stock.items() if quantity < 10]
print ("low stock items:" , low)
with open("day03_stock.txt", "w") as f:
    for item, quantity in stock.items():
        f.write(f"{item},{quantity}\n")


