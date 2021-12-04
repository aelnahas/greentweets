from fastapi import FastAPI
from fastapi.responses import JSONResponse
import typing
import backend.queries as queries
from fastapi.middleware.cors import CORSMiddleware
import json

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_root():
  return {"Ping": "Pong"}

@app.post("/queries/aggregates")
def aggregations():
  pass


@app.post("/queries/geographicals")
def geographicals():
  pass

@app.post("/queries/rankings")
def graphicals():
  pass


@app.get("/queries/raw")
def raw():
  return queries.df.fillna('').to_dict('records')


@app.get("/queries/averages")
def averages(metric: str, key: str = None, country:str = None):
  averages = queries.get_aggregated_metrics(key, metric, country)
  return averages.fillna('').to_dict()

@app.get("/queries/sorted-scores")
def averages():
  averages = queries.get_ranked_user_score()
  return averages.fillna('').to_dict('records')


@app.get("/queries/keywords")
def keywords():
  return queries.unique_keywords()

@app.get("/queries/averaged-by-keywords")
def group_by_keywords(metric: str, key: str = None, keyword: str = "", country: str = ""):
  return queries.group_by_keywords(keyword, key, metric, country).fillna('').to_dict()