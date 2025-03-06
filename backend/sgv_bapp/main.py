import asyncio

from uvicorn import Config, Server

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


@asynccontextmanager
async def lifespan(app: FastAPI):
    session_manager.init(get_db_settings().DATABASE_URI.unicode_string())
    minio_manager.init(get_minio_settings())
    yield
    await session_manager.close()


app = FastAPI(title=get_app_settings().APP_NAME, lifespan=lifespan)

register_exception_handlers(app)

app.include_router(car_router)


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
