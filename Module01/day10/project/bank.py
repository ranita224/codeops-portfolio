from collections import deque
class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total

    def __repr__(self):
        return f"Branch({self.name!r}, accounts={len(self.accounts)}, children={len(self.children)})"

class Account:
    def __init__(self, acct_type, name, number, balance):
        self.type = acct_type
        self.name = name
        self.number = number
        self.balance = balance
        self._subscribers = []

    def subscribe(self, observer):
        self._subscribers.append(observer)

    def notify(self, event):
        for s in self._subscribers:
            try:
                s.update(self, event)
            except Exception as exc:
                # Log and continue so one broken observer doesn't stop the transaction
                print(f"[warning] observer {s} failed: {exc}")

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        self.notify(f"deposit of {amount}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.notify(f"withdrawal of {amount}")

    def transfer(self, to_account, amount):
        self.withdraw(amount)
        to_account.deposit(amount)
        self.notify(f"transfer of {amount} to {to_account.number}")
        to_account.notify(f"transfer of {amount} from {self.number}")

    def __repr__(self):
        return f"Account({self.number}, {self.name!r}, {self.type}, balance={self.balance})"
    
# Centralises account creation so validation/new account types can be added in one place later
class AccountFactory:
    @staticmethod
    def create(acct_type, name, number, balance):
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")
        return Account(acct_type, name, number, balance)

class AccountRegistry:
    def __init__(self):
        self._accounts = {}

    def add(self, account):
        if account.number in self._accounts:
            raise ValueError(f"Account number {account.number} already registered")
        self._accounts[account.number] = account

    def get(self, number):
        return self._accounts.get(number)

class SMSAlert:
    def update(self, account, event):
        print(f"[SMS] {account.name} ({account.number}): {event} -> new balance {account.balance}")

class AuditLog:
    def update(self, account, event):
        print(f"[AUDIT] account={account.number} event={event!r} balance={account.balance}")

def bfs(transfers, start):
    visited = set()
    queue = deque([start])
    while queue:
        acct = queue.popleft()
        if acct not in visited:
            visited.add(acct)
            for neighbor in transfers.get(acct, []):
                queue.append(neighbor)
    return visited

if __name__ == "__main__":
    sms = SMSAlert()
    audit = AuditLog()
    registry = AccountRegistry()

    khalid = AccountFactory.create("savings", "Khalid", 1001, 700)
    kidist = AccountFactory.create("current", "Kidist", 1002, 800)
    almaz = AccountFactory.create("basic", "Almaz", 1003, 500)

    for account in [khalid, kidist, almaz]:
        account.subscribe(sms)
        account.subscribe(audit)
        registry.add(account)

    head_office = Branch("Head Office")
    region1 = Branch("Region 1")
    branchA = Branch("Branch A")

    head_office.add_child(region1)
    region1.add_child(branchA)
    branchA.add_account(khalid)
    branchA.add_account(kidist)
    region1.add_account(almaz)

    print("Total Bank Balance:", head_office.total_balance())

    print()
    print("Performing a transfer (demonstrates Observer pattern)")
    khalid.transfer(kidist, 200)  # SMS + audit fire for both accounts

    print()
    print("Total Bank Balance after transfer:", head_office.total_balance())

    print()
    print("Registry lookup")
    found = registry.get(1002)
    print("Looked up account 1002:", found)

    print()
    print("Reachability via transfer graph (BFS)")
    transfers = {1001: [1002, 1003], 1002: [1003], 1003: []}
    reachable = bfs(transfers, 1001)
    print("Accounts reachable from 1001:", reachable)