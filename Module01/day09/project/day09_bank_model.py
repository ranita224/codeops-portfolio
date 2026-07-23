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
            except Exception:
                pass
class AccountFactory:
    @staticmethod
    def create(acct_type, name, number, balance):
        return Account(acct_type, name, number, balance)
class AccountRegistry:
    def __init__(self):
        self._accounts = {}
    def add(self, account):
        self._accounts[account.number] = account
    def get(self, number):
        return self._accounts.get(number)

class SMSAlert:
    def update(self, account, event):
        pass
class AuditLog:
    def update(self, account, event):
        pass
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

    transfers = {1001: [1002, 1003],1002: [1003],1003: []}
    reachable = bfs(transfers, 1001)
    print("Accounts reachable from 1001:", reachable)
