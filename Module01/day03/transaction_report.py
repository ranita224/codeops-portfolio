#telebirr transaction
with open ("transactions.txt" , "w") as f:
    f.write("Natan,800\n")
    f.write ("Abebch,500 \n" )
    f.write ("Raniya ,10000 \n")
    f.write ("Hayni ,500 \n")
    f.write ("Abebch,-100 \n")
    f.write ("Hiwot,300\n")
    f.write ("Natan,500\n")

trans = {}
try:
    with open ("transactions.txt" , "r") as f:
        for line in f:
            name,amount = line.strip().split(",")
            amount = int(amount)
            trans[name] = trans.get(name,0) + amount
    print(trans)
    trans_sorted = sorted(trans.items(), key=lambda x: x[1], reverse = True )
    print(trans_sorted)
    print("the telebirr report follows as :-")
    with open("report.txt", "w") as report:
        for name, total in trans_sorted:
            line = f"{name}: {total} ETB\n"
           
            print(line.strip())     
            report.write(line)
except FileNotFoundError:
    print("Error: transaction.txt not found!")
finally:
    print("Done processing transactions.")
