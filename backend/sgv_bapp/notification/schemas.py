from pydantic import BaseModel


class ReqDataSchema(BaseModel):
    name: str
    phone: str
    email: str
    budget: int
    city: str
    contactMethod: str
