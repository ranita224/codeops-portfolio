class Account:
    def __init__(self,owner,account_number,balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
    @property
    def balance(self):
        return self.__balance
    def deposit(self,amount):
        if amount <= 0:
            raise ValueError("amount can`t be negtive")
        self.__balance += amount
        return self.__balance
    def withdraw(self,amount):
        if amount > self.__balance:
            raise ValueError ("insuficent amount")
        if amount <= 0 :
            raise ValueError("amount must be postive number")
        self.__balance -= amount
        return self.__balance
    
    def statement(self):
        print(f"Account {self.owner} account number {self.account_number} has a balance of {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate
 
    def add_interest(self):
        interest = self.balance * self.rate
        return self.deposit(interest) 
 
    def statement(self):
        print(f"Savings {self.owner} account number {self.account_number} has a balance of {self.balance}")
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self._Account__balance -= amount
            return self.balance
        else:
            raise ValueError("Overdraft limit exceeded!")

    def statement(self):
        print(f"Current {self.owner} account {self.account_number} has a balance of {self.balance}")
accounts = [
    Account("Almaz", 10004563725, 1000),
    SavingsAccount("Khalid", 1000784657839, 700),
    CurrentAccount("Kidist", 100093846446, 800)
]

for acc in accounts:
    acc.statement()
print(accounts[1].add_interest())  
print(accounts[2].deposit(1500))  