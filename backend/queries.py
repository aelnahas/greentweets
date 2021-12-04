import pandas as pd
import pathlib

csv = pathlib.Path("./backend/tweets_modified_normalized.csv")
df = pd.read_csv(csv.resolve())

def unique_keywords():
  keywords = list(df.fillna('')["keyword"].unique())
  print(keywords)
  processed = set()

  for keyword in keywords:
    terms = keyword.split("+")
    for term in terms:
      if term and term not in processed:
        processed.add(term)
  return list(processed)


def get_ranked_user_score():
  return df.sort_values('user_score').tail(10)


def group_by_keywords(keyword, key, metric):
  filtered = df[df["keyword"].str.contains(keyword)]
  return filtered.groupby(key).mean()[metric]

def get_aggregated_metrics(key, metric, country):
  if len(country) > 0:
    return get_region_aggregate_by_country(country, key, metric)
  averages = df.groupby(key).mean()[metric]
  return averages

def get_region_aggregate_by_country(country, key, metrics):
  filtered = df[ df["country"] == country]
  return filtered.groupby(key).mean()[metrics]


def get_geographical_impressions():
  pass

