import asyncio

from uvicorn import Config, Server

from sqladmin import Admin

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
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
from sgv_bapp.review.router import review_router
from sgv_bapp.admin.views import (
    UserAdmin,
    CarAdmin,
    CarImageAdmin,
    ReviewAdmin)


@asynccontextmanager
async def lifespan(app: FastAPI):
    session_manager.init(get_db_settings().DATABASE_URI.unicode_string())
    await minio_manager.init(get_minio_settings())

    admin = Admin(app, engine=session_manager.get_engine(), session_maker=session_manager.get_sessionmaker())
    admin.add_view(UserAdmin)
    admin.add_view(CarAdmin)
    admin.add_view(CarImageAdmin)
    admin.add_view(ReviewAdmin)

    yield

    await session_manager.close()


app = FastAPI(title=get_app_settings().APP_NAME,
              lifespan=lifespan)

api_router = APIRouter(prefix="/api")

api_router.include_router(car_router)
api_router.include_router(review_router)
api_router.include_router(notify_router)

app.include_router(api_router)

register_exception_handlers(app)


origins = [
    "*"
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
        **get_app_settings().model_dump(exclude={"APP_NAME", 'DOMAIN_NAME'})
    )
    server = Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(run_app())
