from fastapi import FastAPI
# from fastapi.middleware.cores import CORSMiddleware
import backend.queries as queries

origins = ["*"]

app = FastAPI()

# app.add_middleware(
#   CORSMiddleware,
#   allow_origins=origins,
#   allow_credentials=True,
#   allow_methods=["*"],
#   allow_headers=["*"]
# )

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
  return queries.df.to_json(orient="table")