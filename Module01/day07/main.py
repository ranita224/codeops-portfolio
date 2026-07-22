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
        self.history = []  # transaction stack
    def subscribe(self, observer):
        self._observers.append(observer)
    def _notify(self, message):
        for obs in self._observers:
            obs.update(self, message)
    def deposit(self, amount):
        self.balance += amount
        self.history.append(f"Deposited {amount}")
        self._notify(f"Deposited {amount}. New balance: {self.balance}")
        return self.balance
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.history.append(f"Withdrew {amount}")
            self._notify(f"Withdrew {amount}. New balance: {self.balance}")
        else:
            self._notify("Insufficient funds!")
    def undo_last(self):
        if not self.history:
            print("No transactions to undo.")
            return
        last = self.history.pop()
        action, amount = last.split()[0], float(last.split()[1])
        if action == "Deposited":
            self.balance -= amount
        elif action == "Withdrew":
            self.balance += amount
        self._notify(f"Undid last: {last}. New balance: {self.balance}")
    def statement(self):
        print(f"Account {self.owner} account number {self.number} has a balance of {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = BankConfig.get_instance().interest_rate
    def add_interest(self):
        interest = self.balance * self.rate
        self.balance += interest
        self.history.append(f"Interest added {interest}")
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
            self.history.append(f"Withdrew {amount}")
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
            raise ValueError(f"Unknown account type: {kind}")
class AccountRegistry:
    def __init__(self):
        self.accounts = {}  
    def add(self, account):
        self.accounts[account.number] = account
    def find(self, number):
        return self.accounts.get(number)  
    def list_all(self):
        return sorted(self.accounts.values(), key=lambda acc: acc.number)
if __name__ == "__main__":
    sms = SMSAlert()
    log = AuditLog()
    reg = AccountRegistry()
    acc1 = AccountFactory.create("savings", "Khalid", "CBE-1", 700)
    acc2 = AccountFactory.create("current", "Kidist", "CBE-2", 800)
    acc1.subscribe(sms)
    acc1.subscribe(log)
    acc2.subscribe(sms)
    reg.add(acc1)
    reg.add(acc2)
    acc1.add_interest()
    acc2.withdraw(1200)
    acc2.undo_last()
    for acc in reg.list_all():
        acc.statement()
