from pydantic import BaseModel


class ReqDataSchema(BaseModel):
    name: str
    phone_number: str
    email: str
    budget: int
    city_name: str
    messanger: str
