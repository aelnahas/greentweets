from fastapi import FastAPI
from fastapi.responses import JSONResponse
import typing
import orjson
import backend.queries as queries
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

class ORJSONResponse(JSONResponse):
    media_type = "application/json"

    def render(self, content: typing.Any) -> bytes:
        return orjson.dumps(content)

app = FastAPI(default_response_class=ORJSONResponse)

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
  return queries.df.to_dict('records')