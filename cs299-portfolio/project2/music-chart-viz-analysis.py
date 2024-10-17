import pandas as pd

# Read the entire CSV file into a DataFrame
df = pd.read_csv(r"C:\Users\lilim\Downloads\MUSIC_TRACKER.csv", encoding="utf-8")

# Extract specific columns into lists
print(df.head())

songs = df["song title"].tolist()
image = df["image, label"].tolist()
xval = df["x-value"].tolist()
yval = df["y-value"].tolist()
desc = df["description"].tolist()

print(desc)
# print(len(desc))

# coords = set()
# for i in range(len(xval)):
#     x = xval[i]
#     y = yval[i]
    
#     direction = {
#         0:(0.1,0),
#         1:(0,0.1),
#         2:(0.1,0.1),
#         3:(-0.1,0),
#         4:(0,-0.1),
#         5:(-0.1,-0.1),
#         6:(0.1,-0.1),
#         7:(-0.1,0.1)
#     }
#     i = 0
#     while (x, y) in coords:
#         while i<8:
#             # Keep incrementing until we find a coordinate not in the set
#             x += direction[i][0]
#             y += direction[i][1]
#             coords.add((x,y))
#             if i ==7:
#                 i = 0
        
# # print(coords)

# xvals = []
# yvals = []

# for coord in coords:
#     x, y = coord
#     xvals.append(x)
#     yvals.append(y)

# print(xvals)
# # print(yvals)