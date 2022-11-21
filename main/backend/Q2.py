import sys
import pandas as pd
# import plotly.express as px
import matplotlib.pyplot as plt

marks_data = pd.read_json(sys.argv[1])
dict1 = marks_data.to_dict()
# newdf = new = pd.DataFrame.from_dict(pd.read_excel("MarksData.xlsx",sheet_name=None))
newdf = pd.DataFrame.from_dict(dict1)
count = []
for i in range(1, 6):
    temp = len(newdf.loc[(newdf["question2"] == i)])
    count.append(temp)

mylabels = ["More than 15 minutes", "15 minutes","10 minutes","5 minutes","immediately"]
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
fig.savefig('/img/file2.png')

