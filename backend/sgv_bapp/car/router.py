from typing import Annotated

from fastapi import APIRouter, Depends, Query

from sgv_bapp.car.service import CarService, GetCarService
from sgv_bapp.car.mapper import CarMapper, GetCarMapper
from sgv_bapp.car.condition import CarConditionBuilder, get_condition_builder

from sgv_bapp.car.schemas import (
    CarSchema,
    CarCreate,
    CarUpdate,
    CarFilter
)

from sgv_bapp.base import PaginatedResponse
from sgv_bapp.car.car_image.router import car_image_router

car_router = APIRouter(prefix='/car', tags=['car'])

car_router.include_router(car_image_router)


@car_router.get('/', response_model=PaginatedResponse[CarSchema])
async def get_car_all(filters: Annotated[CarFilter, Query()] = None,
                      service: CarService = Depends(GetCarService()),
                      mapper: CarMapper = Depends(GetCarMapper(CarSchema)),
                      condition_builder: CarConditionBuilder = Depends(get_condition_builder),
                      limit: int = Query(100, ge=0),
                      offset: int = Query(0, ge=0)
                      ) -> PaginatedResponse[CarSchema]:
    return await service.get_all(condition_builder, mapper, filters, limit, offset)


@car_router.get('/{car_id}', response_model=CarSchema)
async def get_car_by_id(
        car_id: int,
        mapper: CarMapper = Depends(GetCarMapper(CarSchema)),
        service: CarService = Depends(GetCarService())
) -> CarSchema:
    return await service.get_by_id(car_id, mapper)


@car_router.post('/', response_model=CarSchema)
async def create_car(car: CarCreate,
                     mapper: CarMapper = Depends(GetCarMapper(CarSchema)),
                     service: CarService = Depends(GetCarService())
                     ) -> CarSchema:
    return await service.create(car, mapper)


@car_router.patch('/{car_id}', status_code=204)
async def update_car(car_id: int, car: CarUpdate,
                     service: CarService = Depends(GetCarService())
                     ) -> None:
    return await service.update(car_id, car)


@car_router.put('/{car_id}', status_code=204)
async def update_car_full(car_id: int, car: CarCreate,
                          service: CarService = Depends(GetCarService())
                          ) -> None:
    return await service.update(car_id, car)


@car_router.delete('/{car_id}', status_code=204)
async def delete_car(car_id: int,
                     service: CarService = Depends(GetCarService())
                     ) -> None:
    return await service.delete(car_id)
