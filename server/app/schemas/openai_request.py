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
    prediction: list[Prediction]