import asyncio

from uvicorn import Config, Server

from sqladmin import Admin

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from sgv_bapp.admin.auth import authentication_backend
from sgv_bapp.exceptions import register_exception_handlers
from sgv_bapp.database import session_manager
from sgv_bapp.storage import minio_manager
from sgv_bapp.config import (
    get_settings
)

from sgv_bapp.car import car_router
from sgv_bapp.notification.router import notify_router
from sgv_bapp.review.router import review_router
from sgv_bapp.news.router import news_router
from sgv_bapp.catalog.router.china import china_router

from sgv_bapp.user.view import (
    UserAdmin
)

from sgv_bapp.car.view import CarAdmin
from sgv_bapp.car.car_image.view import CarImageAdmin
from sgv_bapp.news.view import NewsAdmin
from sgv_bapp.review.view import ReviewAdmin


@asynccontextmanager
async def lifespan(app: FastAPI):
    session_manager.init(get_settings().db.DATABASE_URI.unicode_string())
    await minio_manager.init(get_settings().minio)

    admin = Admin(
        app,
        engine=session_manager.get_engine(),
        session_maker=session_manager.get_sessionmaker(),
        authentication_backend=authentication_backend
    )
    admin.add_view(UserAdmin)
    admin.add_view(CarAdmin)
    admin.add_view(CarImageAdmin)
    admin.add_view(ReviewAdmin)
    admin.add_view(NewsAdmin)

    yield

    await session_manager.close()


app = FastAPI(title=get_settings().app.APP_NAME,
              lifespan=lifespan)

api_router = APIRouter(prefix="/api")

api_router.include_router(car_router)
api_router.include_router(review_router)
api_router.include_router(notify_router)
api_router.include_router(news_router)
api_router.include_router(china_router)

app.include_router(api_router)

register_exception_handlers(app)

origins = [
    # "*"
    get_settings().app.DOMAIN_NAME,
    "http://localhost",
    "http://127.0.0.1"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)


async def run_app():
    config = Config(
        **get_settings().uvicorn.model_dump()
    )
    server = Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(run_app())
