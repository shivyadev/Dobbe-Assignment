from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import requests
from dotenv import load_dotenv
from ...utils import convert_dicom_bytes_to_jpeg
import base64

roboflow_router = APIRouter(prefix="/roboflow", tags=["Roboflow"])

@roboflow_router.get("/test")
def test():
    return JSONResponse(content="Hello")

@roboflow_router.post("/detect")
async def analyze_image(image: UploadFile = File(...)):
    if not image.filename.lower().endswith((".dcm", ".rvg")):
        raise HTTPException(status_code=400, detail="Unsupported file format. Expected .dcm or .rvg")    
    
    try:

        load_dotenv()

        contents = await image.read()
        jpeg_image = convert_dicom_bytes_to_jpeg(contents)

        model = os.getenv("ROBOFLOW_MODEL")

        url = f"https://detect.roboflow.com/{model}"
        params = {
            "api_key": os.getenv("ROBOFLOW_API_KEY"),
            "confidence": 30,
            "overlap": 50
        }

        files = {
            "file": ("image.jpg", jpeg_image, "image/jpeg")
        }

        response = requests.post(url, params=params, files=files)

        base64_image = base64.b64encode(jpeg_image.getvalue()).decode("utf-8")

        response_data = response.json()

        print(response_data)

        predictions = response_data.get("predictions", [])

        for prediction in predictions:  
            if "class" in prediction:
                prediction["pathology"] = prediction.pop("class")

        if response.status_code == 200:
            return JSONResponse(status_code=200, content={
                "base64Image": base64_image,
                "annotations": response_data
            })
        else:
            raise Exception(f"Request failed with status code {response.status_code}: {response.text}")


    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")