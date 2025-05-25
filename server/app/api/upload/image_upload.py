import base64
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from ...utils import convert_dicom_bytes_to_jpeg

upload_router = APIRouter(prefix="/upload", tags=["upload"])

@upload_router.post("/image")
async def image_upload(image: UploadFile = File(...)):
    if not image.filename.lower().endswith((".dcm", ".rvg")):
        raise HTTPException(status_code=400, detail="Unsupported file format. Expected .dcm or .rvg")    
    try:
        contents = await image.read()
        jpeg_image = convert_dicom_bytes_to_jpeg(contents)

        base64_image = base64.b64encode(jpeg_image.getvalue()).decode("utf-8")
        
        return JSONResponse(status_code=200, content=base64_image)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")