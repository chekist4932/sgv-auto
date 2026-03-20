from typing import Any

from sgv_bapp.catalog.schemas import LotFilter
from sgv_bapp.config import get_settings

from urllib.parse import quote


API_CODE = get_settings().auction.AUC_CODE
REMOTE_ADDR = get_settings().auction.AUC_REMOTE_ADDR
API_URL = get_settings().auction.AUC_URL

# URL-коды
operators_map = {
    '=': '%3D',
    '>': '%3E',
    '<': '%3C',
    '>=': '%3E%3D',
    '<=': '%3C%3D',
}

# Определяем соответствие полей фильтров и полей в БД
field_mapping = {
    # Равенства
    'id': ('id', '='),
    'marka_name': ('marka_name', '='),
    'model_name': ('model_name', '='),
    'priv': ('priv', '='),
    'kpp': ('kpp', '='),

    # Диапазоны
    'year_gte': ('year', '>='),
    'year_lte': ('year', '<='),
    'mileage_gte': ('mileage', '>='),
    'mileage_lte': ('mileage', '<='),
    'eng_v_gte': ('eng_v', '>='),
    'eng_v_lte': ('eng_v', '<='),
    'pw_gte': ('pw', '>='),
    'pw_lte': ('pw', '<='),
    'finish_gte': ('finish', '>='),
    'finish_lte': ('finish', '<='),
}


def get_sql_condition(field_name: str, value: Any, operator: str) -> str:
    """
       Создает SQL условие с правильным URL-кодированием

       Args:
           field_name: имя поля в БД
           value: значение для сравнения
           operator: оператор сравнения (=, >, <, >=, <=)
       """
    if value is None:
        return ""
    encoded_value = quote(str(value))
    encoded_operator = operators_map.get(operator, '%3D')
    return f"{field_name}%20{encoded_operator}%20%27{encoded_value}%27"


def build_where_clause(filters: dict) -> str:
    """
    Строит WHERE часть SQL запроса из фильтров
    """
    conditions = []

    for filter_name, filter_value in filters.items():
        if filter_value is not None and filter_name in field_mapping:
            db_field, operator = field_mapping[filter_name]
            condition = get_sql_condition(db_field, filter_value, operator)
            if condition:
                conditions.append(condition)

    if conditions:
        return "%20where%20" + "%20and%20".join(conditions)
    return ""


async def get_sql_row(country: str, filters: LotFilter | None) -> tuple[str, str]:
    """
    Генерирует SQL запрос на основе фильтров
    """

    base_select = f"select%20*%20from%20{country}"
    base_count = f"select%20COUNT(*)%20from%20{country}"
    pagination = f"%20limit%20{filters.offset},{filters.limit}"
    if filters_dump := filters.model_dump(exclude={'limit', 'offset'}, exclude_none=True):
        where_clause = build_where_clause(filters_dump)
        return f"{base_select}{where_clause}{pagination}", f"{base_count}{where_clause}"

    return f"{base_select}{pagination}", f"{base_count}"


async def get_sql_row_lot_count(country: str):
    """
    Генерирует SQL запрос для получения кол-ва записей авто
    """
    return f"select%20COUNT(*)%20from%20{country}"


async def get_sql_row_brand(country: str):
    """
    Генерирует SQL запрос для получения уникальных марок авто
    """
    return f"select%20distinct%20marka_name%20from%20{country}"


async def get_sql_row_model(country: str, marka_name):
    """
    Генерирует SQL запрос для получения уникальных моделей авто
    по заданной марке
    """
    return f"select%20distinct%20model_name%20from%20{country}%20where%20marka_name%20=%20%27{marka_name}%27"


async def get_url(sql_row: str) -> str:
    """
    Генерирует полный URL для запроса к API
    """
    return f"{API_URL}&ip={REMOTE_ADDR}&code={API_CODE}&sql={sql_row}"
