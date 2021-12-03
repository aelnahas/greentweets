from fastapi import FastAPI
import queries

app = FastAPI()

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
  return queries.df.to_json(orient="table")