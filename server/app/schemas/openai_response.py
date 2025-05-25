from pydantic import BaseModel

class OpenAIResponse(BaseModel):
    pathology: str
    location: str
    clinical_advice: list[str]