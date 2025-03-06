from typing import Generic

from sgv_bapp.base.types import Model, CreateSchema, UpdateSchema, EntitySchema, FilterSchema
from sgv_bapp.base.repository import BaseRepository
from sgv_bapp.base.mapper import EntityMapper
from sgv_bapp.base.condition import ConditionBuilder
from sgv_bapp.base.schemas import PaginatedResponse


class BaseService(Generic[Model, CreateSchema, UpdateSchema, EntitySchema, FilterSchema]):
    def __init__(
            self,
            repository: BaseRepository[Model]):

        self.repository = repository

    async def get_by_id(self,
                        obj_id: int,
                        mapper: EntityMapper[Model, EntitySchema]
                        ) -> EntitySchema:
        entity = await self.repository.get_by_id(obj_id)
        return mapper.to_schema(entity)

    async def get_all(self,
                      condition_builder: ConditionBuilder[Model],
                      mapper: EntityMapper[Model, EntitySchema],
                      filters: FilterSchema | None = None,
                      limit: int = 100,
                      offset: int = 0
                      ) -> PaginatedResponse[EntitySchema]:
        conditions = await condition_builder.build_condition(filters) if filters else []
        result_objs = await self.repository.get_all(conditions, limit, offset)
        return mapper.to_schemas(result_objs)

    async def create(self,
                     obj: CreateSchema,
                     mapper: EntityMapper[Model, EntitySchema]
                     ) -> EntitySchema:
        entity = self.repository.model(**obj.model_dump())
        await self.repository.add(entity)
        return mapper.to_schema(entity)

    async def update(self,
                     obj_id: int,
                     obj: UpdateSchema | CreateSchema
                     ) -> None:
        entity = await self.repository.get_by_id(obj_id)
        for key, value in obj.model_dump(exclude_none=True).items():
            setattr(entity, key, value)
        await self.repository.add(entity)

    async def delete(self,
                     obj_id: int
                     ) -> None:
        entity = await self.repository.get_by_id(obj_id)
        await self.repository.delete(entity)
