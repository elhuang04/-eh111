import os

# Specify the directory path
directory = "cs299-portfolio/project3/project-media"
# Get a list of all file names in the directory
file_names = os.listdir(directory)

lst = []
# Print out the file names
for file_name in file_names:
    lst.append("project-media/" + file_name)

print(lst)


import matplotlib.pyplot as plt

# Data for the sources and their counts
sources = ['Instagram', 'YouTube', 'Yahoo', 'Offline Music Player', 'NYTimes', 'X', 'Pinterest', 'WhatsApp', 'Reddit', 'Apple News']
counts = [30, 17, 7, 1, 3, 1, 1, 1, 9, 5]  # Update with accurate counts based on your provided data

# Creating the bar chart
plt.figure(figsize=(12, 8))
plt.barh(sources, counts, color='skyblue')
plt.xlabel('Number of Ads')
plt.ylabel('Sources')
plt.title('Number of Ads Collected from Various Sources')
plt.gca().invert_yaxis()  # Invert y-axis to have the highest count on top
plt.show()
