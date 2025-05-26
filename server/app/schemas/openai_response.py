from pydantic import BaseModel

class PathologyItem(BaseModel):
    pathology: str
    location: str

class OpenAIResponse(BaseModel):
    pathologies: list[PathologyItem]
    clinical_advice: list[str]