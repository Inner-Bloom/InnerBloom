import pandas as pd

# 1. python script that fetches the data from the database and processes it into a simple to read dataframe

# Read the CSV file into a DataFrame
df = pd.read_json("http://localhost:8000/users/kingZ")

# Convert the DataFrame to JSON format
json_data = df.to_json(orient="records", date_format="iso")

# Save the JSON data to a file
print(df.head())

print("CSV data has been converted to JSON and saved to Mood_and_Sleep_Data.json")

