# -*- coding: utf-8 -*-
"""CS299 Project 2 Exploratory Data Analysis.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1AWX-G6e5hnxNKn2-Pp-1xuyvEmrwUSIy

# Data Analysis

## Oct 9, 2024

## Step 1: Import Libraries
"""

from google.colab import drive
drive.mount('/content/drive/')
import pandas as pd
import io

f1 = "MUSIC_TRACKER.csv"
f2 = "Web Activity Data - 10_1 9_35 PM R1120.csv"
f3 = "Web Activity Data - 10_2 11_45 PM R2005.csv"
f4 = "Web Activity Data - 9_25 11_40pm R2020.csv"
f5 = "Web Activity Data - 9_26 11_53pm R930.csv"
f6 = "Web Activity Data - 9_27 11_34pm R1064.csv"
f7 = "Web Activity Data - 9_28 11_59pm R1323.csv"
f8 = "Web Activity Data - 9_29 11_40pm R1437.csv"
f9 = "Web Activity Data - 9_30 9_24 PM R1185.csv"
f10 = "Web Activity Data - Summary.csv"
f11 = "CS 299_ Music Listening Tracker (Responses) - Sheet5.csv"

files = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11]

for i in range(len(files)):
  ix = i+1
  file = "/content/drive/MyDrive/cs299-proj2-data/" +files[i]
  exec(f"df{ix} = pd.read_csv('{file}')")

group1 = [df2, df3, df4, df5, df6, df7, df8, df9] #all web activity - use this
group2 = [df1] #music tracking
group3 = [df10] #summary of web activity
group4 = [df11] #actual music log - use this for productivity score

# prompt: Can you perform exploratory data analysis for all these dataframes? dataframes = [df1, df2, df3, df4, df5, df6, df7, df8, df9, df10]. The goal is to understand which music category correlates to the highest productivity or if no music listening correlates to higher productivity scores

# Assuming you have dataframes df1, df2, ..., df10
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Concatenate dataframes
g1 = pd.concat(group1)
g2 = pd.concat(group2)
g3 = pd.concat(group3)
g4 = pd.concat(group4)

#g1.head()
g4.head()

import pandas as pd

# Assuming your original dataframe is called 'g1'
# print(g1["Time start"])
g1['Time start'] = pd.to_datetime(g1['Time start'], format='%I:%M:%S %p', errors='coerce')

g1['Time end'] = pd.to_datetime(g1['Time end'], format='%I:%M:%S %p', errors='coerce')

# Function to update site count for each hour within the activity duration
def update_site_count(row):
    start_time = row['Time start']
    end_time = row['Time end']

    # Skip rows with missing or invalid time values
    if pd.isnull(start_time) or pd.isnull(end_time):
        return

    start_hour = start_time.hour
    end_hour = end_time.hour

    # If activity spans multiple hours, update count for each hour
    if start_hour != end_hour:
        for hour in range(start_hour, end_hour + 1):
            # Create a temporary dataframe to store the updated data
            temp_df = pd.DataFrame({'Category': [row['Category']], 'Hour': [hour], 'Site Count': [1]})

            # Concatenate the temporary dataframe to the result dataframe
            global result_df  # Use global to modify the result dataframe
            result_df = pd.concat([result_df, temp_df], ignore_index=True)
    else:
        # If activity is within the same hour, update count as usual
        temp_df = pd.DataFrame({'Category': [row['Category']], 'Hour': [start_hour], 'Site Count': [1]})
        result_df = pd.concat([result_df, temp_df], ignore_index=True)

# Initialize an empty dataframe to store the results
result_df = pd.DataFrame(columns=['Category', 'Hour', 'Site Count'])

# Apply the update_site_count function to each row
g1.apply(update_site_count, axis=1)

# Group by category and hour, then sum the site counts
result_df = result_df.groupby(['Category', 'Hour'])['Site Count'].sum().reset_index()

# Print the result dataframe
print(result_df)

import pandas as pd

# Assuming your DataFrame is called g4
g4['Timestamp'] = pd.to_datetime(g4['Timestamp'])  # Convert to datetime objects
g4['Hour'] = g4['Timestamp'].dt.hour  # Extract the hour

# Group by hour and count the listens
hourly_counts = g4.groupby('Hour')['Song Title'].count().reset_index()
hourly_counts.rename(columns={'Song Title': 'Listen Count'}, inplace=True)

print(hourly_counts)

import matplotlib.pyplot as plt

# Sample data (replace with your actual data)
hour = hourly_counts['Hour']
listen_count = hourly_counts['Listen Count']

# Create the plot
plt.figure(figsize=(10, 6))
plt.bar(hour, listen_count)
plt.xlabel('Time of Day (Hour)')
plt.ylabel('Listen Count')
plt.title('Hourly Music Listening Pattern')
plt.xticks(range(24))  # Set x-axis ticks to represent hours of the day
plt.grid(True)
plt.show()

import matplotlib.pyplot as plt
import seaborn as sns

# Assuming your dataframe is called 'result_df'
# ... (your code to generate result_df) ...

# Create the plot
plt.figure(figsize=(10, 6))  # Adjust figure size as needed
sns.lineplot(x='Hour', y='Site Count', hue='Category', data=result_df)

# Customize the plot
plt.xlabel('Time of Day (Hour)')
plt.ylabel('Site Count')
plt.title('Website Activity by Category and Time of Day')
plt.xticks(range(24))  # Set x-axis ticks to represent hours of the day
plt.grid(True)  # Add a grid for better readability
plt.legend(title='Category')

# Show the plot
plt.show()

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Assuming you have 'hourly_counts' and 'result_df' dataframes
# ... (your code to generate hourly_counts and result_df) ...

# Extract hour and listen count from hourly_counts
hour = hourly_counts['Hour']
listen_count = hourly_counts['Listen Count']

# Create the figure and axes
fig, ax1 = plt.subplots(figsize=(10, 6))

# Bar chart for music listening
ax1.bar(hour, listen_count, color='skyblue', label='Listen Count')
ax1.set_xlabel('Time of Day (Hour)')
ax1.set_ylabel('Listen Count', color='skyblue')
ax1.tick_params(axis='y', labelcolor='skyblue')

# Create a second y-axis for website activity
ax2 = ax1.twinx()

# Line chart for website activity
sns.lineplot(x='Hour', y='Site Count', hue='Category', data=result_df, ax=ax2)
ax2.set_ylabel('Site Count', color='coral')
ax2.tick_params(axis='y', labelcolor='coral')

# Customize the plot
plt.title('Hourly Music Listening and Website Activity')
plt.xticks(range(24))  # Set x-axis ticks to represent hours of the day
plt.grid(True)
fig.legend(loc='upper left')  # Combine legends

plt.show()

from matplotlib import pyplot as plt
import seaborn as sns
def _plot_series(series, series_name, series_index=0):
  palette = list(sns.palettes.mpl_palette('Dark2'))
  counted = (series['Timestamp']
                .value_counts()
              .reset_index(name='counts')
              .rename({'index': 'Timestamp'}, axis=1)
              .sort_values('Timestamp', ascending=True))
  xs = counted['Timestamp']
  ys = counted['counts']
  plt.plot(xs, ys, label=series_name, color=palette[series_index % len(palette)])

fig, ax = plt.subplots(figsize=(10, 5.2), layout='constrained')
df_sorted = _df_3.sort_values('Timestamp', ascending=True)
for i, (series_name, series) in enumerate(df_sorted.groupby('Timestamp')):
  _plot_series(series, series_name, i)
  fig.legend(title='Timestamp', bbox_to_anchor=(1, 1), loc='upper left')
sns.despine(fig=fig, ax=ax)
plt.xlabel('Timestamp')
_ = plt.ylabel('count()')

# @title Productivity Factor

from matplotlib import pyplot as plt
g4['Productivity Factor'].plot(kind='line', figsize=(8, 4), title='Productivity Factor')
plt.gca().spines[['top', 'right']].set_visible(False)

# @title Timestamp vs count()

from matplotlib import pyplot as plt
import seaborn as sns
def _plot_series(series, series_name, series_index=0):
  palette = list(sns.palettes.mpl_palette('Dark2'))
  counted = (series['Timestamp']
                .value_counts()
              .reset_index(name='counts')
              .rename({'index': 'Timestamp'}, axis=1)
              .sort_values('Timestamp', ascending=True))
  xs = counted['Timestamp']
  ys = counted['counts']
  plt.plot(xs, ys, label=series_name, color=palette[series_index % len(palette)])

fig, ax = plt.subplots(figsize=(10, 5.2), layout='constrained')
df_sorted = g4.sort_values('Timestamp', ascending=True)
_plot_series(df_sorted, '')
sns.despine(fig=fig, ax=ax)
plt.xlabel('Timestamp')
_ = plt.ylabel('count()')

# @title Timestamp vs Productivity Factor

from matplotlib import pyplot as plt
import seaborn as sns
def _plot_series(series, series_name, series_index=0):
  palette = list(sns.palettes.mpl_palette('Dark2'))
  xs = series['Timestamp']
  ys = series['Productivity Factor']

  plt.plot(xs, ys, label=series_name, color=palette[series_index % len(palette)])

fig, ax = plt.subplots(figsize=(10, 5.2), layout='constrained')
df_sorted = g4.sort_values('Timestamp', ascending=True)
_plot_series(df_sorted, '')
sns.despine(fig=fig, ax=ax)
plt.xlabel('Timestamp')
_ = plt.ylabel('Productivity Factor')

# @title Productivity Factor

from matplotlib import pyplot as plt
g4['Productivity Factor'].plot(kind='hist', bins=20, title='Productivity Factor')
plt.gca().spines[['top', 'right',]].set_visible(False)

