from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import JSONResponse
from ...schemas.openai_response import OpenAIResponse
from ...schemas.openai_request import OpenAIRequest

openai_router = APIRouter(prefix="/openai", tags=['openai'])

@openai_router.post("/analyze")
async def analyze_annotations(prediction: OpenAIRequest = Body(...)):
    print(prediction.prediction)
    return JSONResponse(content="Recived", status_code=200)