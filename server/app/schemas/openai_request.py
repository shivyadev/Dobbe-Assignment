from pydantic import BaseModel

class Prediction(BaseModel):
    x: int
    y: int
    width: int
    height: int
    confidence: float
    pathology: str
    class_id: int
    detection_id: str

class OpenAIRequest(BaseModel):
    image_base64: str
    image_width: int
    image_height: int
    prediction: list[Prediction]