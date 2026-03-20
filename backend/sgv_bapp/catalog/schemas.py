from typing import Optional, Any
from typing_extensions import Self

from pydantic import BaseModel, field_validator, ValidationInfo, IPvAnyAddress, ValidationError, Field, ConfigDict
from datetime import datetime

from sgv_bapp.base import ConditionsInt
from sgv_bapp.base import BaseFilter


class BaseChinaAuction(BaseModel):
    model_config = ConfigDict(
        protected_namespaces=(),
        populate_by_name=True,
        extra='ignore'
    )


class LotCountItem(BaseChinaAuction):
    tag0: Optional[str] = Field(None, alias='TAG0')


class MarkaNameItem(BaseChinaAuction):
    marka_name: Optional[str] = Field(None, alias='MARKA_NAME')


class ModelNameItem(BaseChinaAuction):
    model_name: Optional[str] = Field(None, alias='MODEL_NAME')


class ChinaAuctionItem(BaseChinaAuction):
    id: Optional[str] = Field(None, alias='ID')
    lot: Optional[str] = Field(None, alias='LOT')
    auction_date: Optional[str] = Field(None, alias='AUCTION_DATE')
    auction: Optional[str] = Field(None, alias='AUCTION')
    marka_id: Optional[str] = Field(None, alias='MARKA_ID')
    model_id: Optional[str] = Field(None, alias='MODEL_ID')
    marka_name: Optional[str] = Field(None, alias='MARKA_NAME')
    model_name: Optional[str] = Field(None, alias='MODEL_NAME')
    year: Optional[str] = Field(None, alias='YEAR')
    eng_v: Optional[str] = Field(None, alias='ENG_V')
    pw: Optional[str] = Field(None, alias='PW')
    kuzov: Optional[str] = Field(None, alias='KUZOV')
    grade: Optional[str] = Field(None, alias='GRADE')
    color: Optional[str] = Field(None, alias='COLOR')
    kpp: Optional[str] = Field(None, alias='KPP')
    kpp_type: Optional[str] = Field(None, alias='KPP_TYPE')
    priv: Optional[str] = Field(None, alias='PRIV')
    mileage: Optional[str] = Field(None, alias='MILEAGE')
    equip: Optional[str] = Field(None, alias='EQUIP')
    rate: Optional[str] = Field(None, alias='RATE')
    start: Optional[str] = Field(None, alias='START')
    finish: Optional[str] = Field(None, alias='FINISH')
    status: Optional[str] = Field(None, alias='STATUS')
    time: Optional[str] = Field(None, alias='TIME')
    avg_price: Optional[str] = Field(None, alias='AVG_PRICE')
    avg_string: Optional[str] = Field(None, alias='AVG_STRING')
    lhdrive: Optional[str] = Field(None, alias='LHDRIVE')
    images: Optional[list[str]] = Field(None, alias='IMAGES')
    serial: Optional[str] = Field(None, alias='SERIAL')
    info: Optional[str] = Field(None, alias='INFO')

    country_auction: Optional[str] = Field(None, alias='COUNTRY_AUCTION')

    @field_validator('images', mode='before')
    @classmethod
    def assemble_image_url(cls, field_value: Optional[str], values: ValidationInfo):
        if isinstance(field_value, str):
            field_value = [
                image_url.replace('che&h=50', 'che&w=320') if 'che&h=50' in image_url else image_url.replace('che', 'che&w=320')
                for image_url in field_value.split('#')
            ]
            return field_value
        return None


class LotFilter(BaseFilter):
    id: Optional[str] = Field(None, description="ID лота", alias="id")
    marka_name: Optional[str] = Field(None, description="Марка автомобиля", alias="marka_name")
    model_name: Optional[str] = Field(None, description="Модель автомобиля", alias="model_name")
    priv: Optional[str] = Field(None, description="Привод", alias="priv")
    kpp: Optional[str] = Field(None, description="Коробка передач", alias="kpp")

    year_gte: Optional[int] = Field(None, description="Год выпуска больше или равно", alias="year_gte")
    year_lte: Optional[int] = Field(None, description="Год выпуска меньше или равно", alias="year_lte")

    mileage_gte: Optional[int] = Field(None, description="Пробег больше или равно", alias="mileage_gte")
    mileage_lte: Optional[int] = Field(None, description="Пробег меньше или равно", alias="mileage_lte")

    eng_v_gte: Optional[int] = Field(None, description="Объем двигателя больше чем", alias="eng_v_gte")
    eng_v_lte: Optional[int] = Field(None, description="Объем двигателя меньше чем", alias="eng_v_lte")

    pw_gte: Optional[int] = Field(None, description="Мощность больше или равно", alias="pw_gte")
    pw_lte: Optional[int] = Field(None, description="Мощность меньше или равно", alias="pw_lte")

    finish_gte: Optional[int] = Field(None, description="Цена больше или равно", alias="finish_gte")
    finish_lte: Optional[int] = Field(None, description="Цена меньше или равно", alias="finish_lte")

    # Пагинация
    limit: int = Field(100, gt=0, le=100, description="Количество записей", alias="limit")
    offset: int = Field(0, ge=0, description="Смещение", alias="offset")

    model_config = ConfigDict(
        protected_namespaces=(),
    )
