flag="IUCzus5b2^l2^tq^c5^t^f1f1|"

dec=[]
for i in flag:
    dec.append((int(str(ord(i)))))


for i in range(len(dec)):
    dec[i]=dec[i]^126
    print(dec[i])

    
