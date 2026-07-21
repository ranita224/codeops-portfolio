class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
class deposit:
    def __init__(self, amount):
        self.amount = amount
        self.balance += amount
        return self.balance
class withdraw:
     
    def __init__ (self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            return("Insufficient funds!")
    def statement(self): 
        print(f"Account {self.owner} account number {self.number} has a balance of {self.balance}")