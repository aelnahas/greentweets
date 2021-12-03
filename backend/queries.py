import pandas as pd
import pathlib

csv = pathlib.Path("./backend/tweetsv1.csv")
df = pd.read_csv(csv.resolve())

def unique_keywords():
  keywords = list(df.fillna('')["key_word"].unique())
  print(keywords)
  processed = set()

  for keyword in keywords:
    terms = keyword.split("+")
    for term in terms:
      if term and term not in processed:
        processed.add(term)
  return list(processed)


def get_ranked():
  pass


def get_aggregated_metrics():
  pass


def get_geographical_impressions():
  pass

