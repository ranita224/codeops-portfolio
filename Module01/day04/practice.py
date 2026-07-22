
#1. Book class. Define Book with title, author, and pages. Add #a describe() method that prints a one-line summary. Create two #books.
import re


class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        return(f"{self.title} by {self.author}, {self.pages} pages")

book1 = Book("the count of monte cristo", "alexandre dumas", 1276)
book2 = Book("The silent patient", "alex michaelides", 336)

print(book1.describe())
print(book2.describe())
print (book1.title)
#2Product class. Define Product with name, price (ETB), and #quantity. Add restock(n) and sell(n) methods that change the #quantity. 
class Product:
    def __init__(self,name,price,quantity):
        self.name = name 
        self.price = price
        self.quantity = quantity
    def restock(self , amount):
        if amount < 0:
            raise ValueError("Restock amount cannot be negative")
        self.quantity += amount
        return self.quantity
    def sell (self, amount):
        if amount < 0:
            raise ValueError("Sell amount cannot be negative")
        if amount > self.quantity:
            raise ValueError("Not enough quantity to sell")
        self.quantity -= amount
        return self.quantity
product1 = Product("Laptop", 50000, 10)
print(product1.quantity)
print (product1.restock(10))
print (product1.sell(5))
#3.Make it private. Change quantity to a private __quantity and #add a @property getter for it.
class Product:
    def __init__(self, name,price,quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    
    def quantity(self):
        return self.__quantity
    def restock(self ,amount):
        if amount < 0:
            raise ValueError("Restock amount cannot be negative")
        self.__quantity += amount
        return self.__quantity
    def sell (self, amount):
        if amount < 0:
            raise ValueError("Sell amount cannot be negative")
        if amount > self.__quantity:
            raise ValueError("Not enough quantity to sell")
        self.__quantity -= amount
        return self.__quantity
product1 = Product("Laptop", 50000 ,14)
print(product1.quantity)
print (product1.restock(10))    
print (product1.sell(6))
print(product1.price)
#4. Validate. Add a setter (or guard in sell) that refuses to #let the quantity go below zero.
class Product:
    def __init__(self, name,price,quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    @property   
    def quantity(self):
        return self.__quantity
    @quantity.setter
    def quantity(self, value):
        if value < 0:
            raise ValueError("Quantity cannot be negative")
        self.__quantity = value
    def restock(self , amount):
        if amount < 0:
            raise ValueError("Restock amount cannot be negative")
        self.__quantity += amount
        return self.__quantity
    def sell (self, amount):
        if amount < 0 or amount > self.__quantity:
            raise ValueError("Invalid sell amount")
        self.__quantity -= amount
        return self.__quantity
try:
    product1 = Product("Laptop", 50000 ,10)
    print (product1.quantity)
except ValueError as a:
    print("Error: ", a)

   

#5.Prove independence. Create three Product objects, change one, and show the other two are unaffected.
class product:
    def __init__(self,name,price,quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
        
    def sell (self , amount):
        if amount > self.quantity:
            raise ValueError ("there isn`t enough amount to sell")
        if amount < 0:
           raise ValueError ("amount can`t be negtive")
        self.quantity -= amount  
        return self.quantity
    def restock (self, amount):
        if amount < 0:
            raise ValueError ("amount can`t be negtive")
        self.quantity += amount
        return self.quantity
product1 = product("paracitamol", 500, 10)
product2 = product("Vitamin C", 150, 30)
product3 = product("Bandage", 50, 100)

print("\nBefore changing product1:")
print(product1.name, product1.quantity ,product1.price)
print(product2.name, product2.quantity, product2.price)
print(product3.name, product3.quantity, product3.price)

try:
    product1.sell(8)
    product1.restock(5)
except ValueError as a:
    print("Error: ", a)


print("\nAfter changing product1 only:")
print(product1.name, product1.quantity ,product1.price)   
print(product2.name, product2.quantity, product2.price)   
print(product3.name, product3.quantity, product3.price)   #from the above output we can see that changing product1 does not affect product2 and product3

        

    

        