from fastapi import APIRouter, Depends

from sgv_bapp.config import get_bot_settings

from sgv_bapp.notification.bot import BotService
from sgv_bapp.notification.schemas import ReqDataSchema

notify_router = APIRouter(prefix='/notification', tags=['notification'])


@notify_router.post('/', status_code=204)
async def send_req(info: ReqDataSchema,
                   bot: BotService = Depends(
                       BotService(**get_bot_settings().model_dump())
                   )
                   ):
    await bot.send(info)
