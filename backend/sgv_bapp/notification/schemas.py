from pydantic import BaseModel


class ReqDataSchema(BaseModel):
    name: str
    phone: str
    email: str | None = None
    budget: int
    city: str
    contactMethod: str


class ReqCallSchema(BaseModel):
    name: str
    phone: str
    comment: str
