import asyncio

import httpx
from fastapi import HTTPException

from sgv_bapp.base.schemas import PaginatedResponse
from sgv_bapp.catalog.schemas import ChinaAuctionItem, LotCountItem


async def fetch_lot_from_api(
        url_items: str,
        url_total: str,
        country: str
) -> PaginatedResponse:

    try:
        async with httpx.AsyncClient() as client:
            if 'id%20%3D' in url_items:
                items_response = await client.get(url_items)
                items = items_response.json()
                items = [ChinaAuctionItem(**item, country_auction=country) for item in items]
                return PaginatedResponse(count=len(items), items=items)

            tasks = [
                client.get(url_items),
                client.get(url_total)
            ]
            responses = await asyncio.gather(*tasks, return_exceptions=True)

            # Проверяем результаты
            for response in responses:
                if isinstance(response, Exception) or response.status_code != 200:
                    raise HTTPException(status_code=502, detail="External API error")

            items_response, count_response = responses
            items = items_response.json()
            total = count_response.json()

    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"External API unavailable: {str(e)}")
    total = LotCountItem(**total[0])
    items = [ChinaAuctionItem(**item, country_auction=country) for item in items]
    return PaginatedResponse(total=total.tag0, count=len(items), items=items)


async def fetch_from_api(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
