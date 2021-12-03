from fastapi import FastAPI
from fastapi.responses import JSONResponse
import typing
import backend.queries as queries
from fastapi.middleware.cors import CORSMiddleware

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