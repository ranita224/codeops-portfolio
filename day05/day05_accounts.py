class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
        return self.balance
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            return("Insufficient funds!")
    def statement(self): 
        print(f"Account {self.owner} account number {self.number} has a balance of {self.balance}")
class  SavingsAccount(Account):
    def __init__(self,owner,number,balance = 0,rate = 0.05):
        super().__init__(owner, number ,balance)
        self.rate = rate 
    def add_interest (self):
        interest = self.balance * self.rate
        self.balance += interest
        return self.balance
    def statement(self):
        print(f"Savings {self.owner} account number is {self.number} has a balance of {self.balance}")
class CurrentAccount(Account):
    def __init__(self,owner,number,balance = 0,overdraft = 1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft 
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            return self.balance
        else:
            return("Overdraft limit exceeded!")
    def statement(self):
        print(f"Current {self.owner} account number is {self.number} has a balance of {self.balance}")
accounts = [ Account("Almaz",100027364758 , 500) , SavingsAccount("Khalid",1000784657839 , 700,0.05) ,CurrentAccount("Kidist",100093846446, 800) ]
for a in accounts:
    a.statement()




       