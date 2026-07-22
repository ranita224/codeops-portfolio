class AlertService:
    def __init__(self):
        self._observers = []
    def subscribe(self, observer):
        self._observers.append(observer)
    def notify(self, event):
        for obs in self._observers:
            obs.update(event)
class SMSAlert:
    def update(self, event):
        print(f"[SMS] {event}")
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.alert_service = AlertService()

    def subscribe(self, observer):
        self.alert_service.subscribe(observer)

    def _notify(self, message):
        self.alert_service.notify(message)
    def deposit(self, amount):
        self.balance += amount
        self._notify(f"{self.owner} deposited {amount}")
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self._notify(f"{self.owner} withdrew {amount}")
        else:
            self._notify("Insufficient funds!")
    def statement(self):
        print(f"{self.owner} ({self.number}) balance: {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate
    def add_interest(self):
        interest = self.balance * self.rate
        self.balance += interest
        self._notify(f"Interest added: {interest}")
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            self._notify(f"{self.owner} withdrew {amount} (overdraft OK)")
        else:
            self._notify("Overdraft limit exceeded!")
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type")
sms = SMSAlert()
acc = AccountFactory.create("savings", "Khalid", "1000784657839", 700)
acc.subscribe(sms) 
acc.deposit(100)
acc.add_interest()
acc.statement()
