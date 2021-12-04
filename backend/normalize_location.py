import pandas as pd
from pandas.core.algorithms import mode
import googlemaps
import json
import os

api_key = os.environ.get("API_KEY") 

gmaps = googlemaps.Client(key=api_key)

df = pd.read_csv("./tweets_modified.csv")
locations = df.fillna('')['location'].unique()

geocodes = {}

for location in locations:
  print(f"processing {location}...")
  try:
    gr = gmaps.geocode(location)
    geocodes[location] = gr
    print(f"processed {location}")
  except Exception as e:
    print(f"could not process {location}, {e}")
    pass

with open("./geocodes.json", mode='w') as output:
  output.write(json.dumps(geocodes))
  
  
