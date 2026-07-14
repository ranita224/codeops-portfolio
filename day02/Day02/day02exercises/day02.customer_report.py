customers = [ ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200), ("Hanna", 1200), ("Samuel", 450), ]
def tire(balance):
    if balance >= 1000:
        return("premium")
    elif balance >= 500 :
        return("standard")
    elif balance < 500:
        return ("basic")
for name, balance in customers:
    print(name , tire(balance),balance ,"ETB")

print(len(tire(balance)))
    