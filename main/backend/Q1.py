import pandas as pd
import matplotlib.pyplot as plt
marks_data = pd.read_json("test.json")

dict1=marks_data.to_dict()
newdf = pd.DataFrame.from_dict(dict1)
count = []
for i in range(1,4):
    temp = len(newdf.loc[(newdf["question1"]==i)])
    count.append(temp)
mylabels = ["Through a person known to a police officer","With a neighbour/ local leader","On your own"]
myexplode = []
index = maxpos = count.index(max(count))

for i in range(0,len(count)):
    print(i)
    if(i==index):
        myexplode.append(0.3)
        continue
    myexplode.append(0)

print(myexplode)
plt.pie(count, labels = mylabels, explode = myexplode, shadow = True)
fig = plt.gcf()
fig.savefig('/img/file.png')