import asyncio

from uvicorn import Config, Server

from sqladmin import Admin

from fastapi import FastAPI
from contextlib import asynccontextmanager

from sgv_bapp.exceptions import register_exception_handlers
from sgv_bapp.database import session_manager
from sgv_bapp.storage import minio_manager
from sgv_bapp.config import (
    get_db_settings,
    get_app_settings,
    get_minio_settings
)

from sgv_bapp.car import car_router
from sgv_bapp.notification.router import notify_router
from sgv_bapp.admin.views import UserAdmin, CarAdmin, CarImageAdmin


@asynccontextmanager
async def lifespan(app: FastAPI):
    session_manager.init(get_db_settings().DATABASE_URI.unicode_string())
    await minio_manager.init(get_minio_settings())

    admin = Admin(app, engine=session_manager.get_engine(), session_maker=session_manager.get_sessionmaker())
    admin.add_view(UserAdmin)
    admin.add_view(CarAdmin)
    admin.add_view(CarImageAdmin)

    yield

    await session_manager.close()


app = FastAPI(title=get_app_settings().APP_NAME, lifespan=lifespan)

register_exception_handlers(app)

app.include_router(car_router)
app.include_router(notify_router)


async def run_app():
    config = Config(
        app="sgv_bapp.main:app",
        host=get_app_settings().APP_IP,
        port=get_app_settings().APP_PORT,
        reload=True,
        proxy_headers=True,
    )
    server = Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(run_app())
