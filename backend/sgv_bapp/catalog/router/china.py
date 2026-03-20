from typing import Annotated, List, Union, Literal

from fastapi import APIRouter, Depends, Query

from sgv_bapp.base import PaginatedResponse
from sgv_bapp.catalog.service import fetch_from_api, fetch_lot_from_api
from sgv_bapp.catalog.utils import (
    get_sql_row,
    get_url,
    get_sql_row_brand,
    get_sql_row_model,
    get_sql_row_lot_count
)
from sgv_bapp.catalog.schemas import (
    ChinaAuctionItem,
    LotFilter,
    MarkaNameItem,
    ModelNameItem,
    LotCountItem
)

china_router = APIRouter(prefix='/catalog', tags=['catalog'])


@china_router.get('/{country}', response_model=PaginatedResponse[ChinaAuctionItem])
async def get_china(
        country: Literal["china", "korea"],
        filters: Annotated[LotFilter, Query()] = None
):
    sql_items, sql_total = await get_sql_row(country, filters)
    url_items, url_total = await get_url(sql_items), await get_url(sql_total)
    return await fetch_lot_from_api(url_items, url_total, country)


@china_router.get('/{country}/brands', response_model=Union[MarkaNameItem, list[MarkaNameItem]])
async def get_brands(
        country: Literal["china", "korea"]
):
    sql_row = await get_sql_row_brand(country)
    url = await get_url(sql_row)
    return await fetch_from_api(url)


@china_router.get('/{country}/lot_count', response_model=Union[LotCountItem, list[LotCountItem]])
async def get_lot_count(
        country: Literal["china", "korea"]
):
    sql_row = await get_sql_row_lot_count(country)
    url = await get_url(sql_row)
    return await fetch_from_api(url)


@china_router.get('/{country}/models/{marka_name}', response_model=Union[ModelNameItem, list[ModelNameItem]])
async def get_brands(
        country: Literal["china", "korea"],
        marka_name: str
):
    sql_row = await get_sql_row_model(country, marka_name)
    url = await get_url(sql_row)
    return await fetch_from_api(url)
