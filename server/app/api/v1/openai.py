from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import JSONResponse
from ...schemas.openai_response import OpenAIResponse
from ...schemas.openai_request import OpenAIRequest
from openai.types.chat import ChatCompletionMessageParam
from ...services.openai_client import client
from typing import List
from ...utils import base64_to_data_url
import json

openai_router = APIRouter(prefix="/openai", tags=['openai'])

@openai_router.post("/analyze")
async def analyze_annotations(request: OpenAIRequest = Body(...)):
    try:
        
        image_url = base64_to_data_url(request.image_base64)

        prediction_text = f"Image Dimensions: {request.image_width}x{request.image_height}\n\n" + "\n".join(
            [
                f"  Pathology: {p.pathology}\n"
                f"  Coordinates: (x={p.x}, y={p.y}, w={p.width}, h={p.height})\n"
                f"  Confidence: {p.confidence:.2f}"
                for p in request.prediction
            ]
        )

        tool_schema = {
            "type": "function",
            "function": {
                "name": "OpenAIResponse",
                "description": "Generate a diagnostic report based on dental radiological analysis",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "pathologies": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "pathology": {
                                        "type": "string",
                                        "description": "Name of the identified pathology"
                                    },
                                    "location": {
                                        "type": "string", 
                                        "description": "Anatomical location using dental terminology (e.g., 'upper left first molar', 'lower right canine region', 'maxillary anterior'). Do NOT use coordinate numbers."
                                    }
                                },
                                "required": ["pathology", "location"]
                            },
                            "description": "List of all pathologies identified in the dental image"
                        },
                        "clinical_advice": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Clinical recommendations based on all findings"
                        }
                    },
                    "required": ["pathologies", "clinical_advice"]
                }
            }
        }


        messages: List[ChatCompletionMessageParam] = [
            {
                "role": "system",
                "content": "You are a dental radiologist. Based on the image and the prediction provided below (which include detected pathologies), write a concise diagnostic report in clinical language.",
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Here is the medical image:"},
                    {"type": "image_url", "image_url": {"url": image_url}},
                    {"type": "text", "text": f"Bounding Box Predictions:\n{prediction_text}"},
                ],
            },
        ]


        if client is not None:
            completion = client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=[tool_schema],
                tool_choice={"type": "function", "function": {"name": "OpenAIResponse"}},
            )

            if completion.choices[0].message.tool_calls:
                tool_call = completion.choices[0].message.tool_calls[0]
                response_data = json.loads(tool_call.function.arguments)
                
                validated_response = OpenAIResponse(**response_data)
        else:
            response_data = {
                "pathologies": [
                    {
                        "pathology": "cavity",
                        "location": "lower left second molar"
                    },
                    {
                        "pathology": "periapical lesion",
                        "location": "lower left second molar"
                    }
                ],
                "clinical_advice": [
                    "Recommend restorative treatment for the detected cavity on the lower left second molar.",
                    "Further evaluation and potential endodontic treatment for the periapical lesion on the lower left second molar is advised."
                ]
            }

            validated_response = OpenAIResponse(**response_data)

        return JSONResponse(content=validated_response.dict(), status_code=200)
        # else:
        #     raise HTTPException(status_code=500, detail="No tool call response received")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")