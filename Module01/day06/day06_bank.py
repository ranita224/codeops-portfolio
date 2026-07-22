class SMSAlert:
    def update(self, account, message):
        print(f"[SMS] {account.owner}: {message}")
class AuditLog:
    def update(self, account, message):
        print(f"[Audit] {account.number}: {message}")
class BankConfig:
    _instance = None
    def __init__(self, interest_rate=0.05, overdraft_limit=1000):
        self.interest_rate = interest_rate
        self.overdraft_limit = overdraft_limit
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = BankConfig()
        return cls._instance
class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []
    def subscribe(self, observer):
        self._observers.append(observer)
    def _notify(self, message):
        for obs in self._observers:
            obs.update(self, message)
    def deposit(self, amount):
        self.balance += amount
        self._notify(f"Deposited {amount}. New balance: {self.balance}")
        return self.balance
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self._notify(f"Withdrew {amount}. New balance: {self.balance}")
        else:
            self._notify("Insufficient funds!")
    def statement(self):
        print(f"Account {self.owner} account number {self.number} has a balance of {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = BankConfig.get_instance().interest_rate
    def add_interest(self):
        interest = self.balance * self.rate
        self.balance += interest
        self._notify(f"Interest added {interest}. New balance: {self.balance}")
        return self.balance
    def statement(self):
        print(f"Savings {self.owner} account number {self.number} has a balance of {self.balance}")
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = BankConfig.get_instance().overdraft_limit
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            self._notify(f"Withdrew {amount}. New balance: {self.balance}")
            return self.balance
        else:
            self._notify("Overdraft limit exceeded!")
    def statement(self):
        print(f"Current {self.owner} account number {self.number} has a balance of {self.balance}")
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            return Account(owner, number, balance)
if __name__ == "__main__":
    sms = SMSAlert()
    audit = AuditLog()
    accounts = [AccountFactory.create("savings", "Khalid", 1000784657839, 700),
        AccountFactory.create("current", "Kidist", 100093846446, 800),
        AccountFactory.create("basic", "Almaz", 100027364758, 500)]
    for a in accounts:
        a.subscribe(sms)
        a.subscribe(audit)
        a.deposit(100)
        a.withdraw(50)
        a.statement()
