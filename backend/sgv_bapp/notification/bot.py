from aiogram import Bot

from sgv_bapp.notification.schemas import ReqDataSchema


class BotService:
    def __init__(self, token, chat_id):
        self.bot = Bot(token=token)
        self.chat_id = chat_id

    async def send(self, info: ReqDataSchema):
        message = 'Новая заявка:\n' + '\n'.join([f'{key}: {val}' for key, val in dict(info).items()])
        await self.bot.send_message(chat_id=self.chat_id, text=message)

    def __call__(self):
        return self
