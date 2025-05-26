from fastapi import FastAPI
from app.api.v1.roboflow import roboflow_router
from app.api.v1.openai import openai_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roboflow_router)
app.include_router(openai_router)