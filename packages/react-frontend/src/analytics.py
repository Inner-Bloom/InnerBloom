import pandas as pd

# 1. python script that fetches the data from the database and processes it into a simple to read dataframe
# Create a sample DataFrame
#df = pd.read_csv("./sample_data/Sleep_Data__Last_30_Days_.csv")
#df['Date'] = pd.to_datetime(df['Date'])
#print(df.head())

# Read the CSV file into a DataFrame
df = pd.read_csv("./sample_data/Mood_and_Sleep_Data.csv")

# Convert the DataFrame to JSON format
json_data = df.to_json(orient="records", date_format="iso")

# Save the JSON data to a file
with open("./sample_data/Mood_and_Sleep_Data.json", "w") as json_file:
    json_file.write(json_data)

print("CSV data has been converted to JSON and saved to Mood_and_Sleep_Data.json")

