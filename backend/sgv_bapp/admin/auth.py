from typing import Optional

from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from sgv_bapp.config import get_settings

from sgv_bapp.auth.security import create_access_token, authenticate_user, get_current_user_admin


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        user = await authenticate_user(form["username"], form["password"])

        if not user or not user.is_superuser:
            return False

        token_data = {
            "sub": str(user.id),
            "admin": user.is_superuser
        }

        access_token = create_access_token(token_data)
        request.session.update({'token': access_token})
        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> Optional[RedirectResponse | bool]:
        token = request.session.get('token')
        if not token:
            return RedirectResponse(request.url_for('admin:login'), status_code=302)
        try:
            user = await get_current_user_admin(access_token=token)
        except Exception as er:
            print(f'In admin panel: {er}')
            return RedirectResponse(request.url_for('admin:login'), status_code=302)
        print(f'In admin panel | {user}')
        if not user:
            return RedirectResponse(request.url_for('admin:login'), status_code=302)
        return True


authentication_backend = AdminAuth(secret_key=get_settings().auth.PRIVATE_KEY)
