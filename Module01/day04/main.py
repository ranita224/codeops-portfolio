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
almaz = Account("Almaz" , 10004563725 , 1000)
alazar = Account("Alazar" , 10008935467 , 2678)
print(almaz.withdraw(300))
print(alazar.deposit(500))
