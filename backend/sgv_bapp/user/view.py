from sgv_bapp.base.view import PageView
from user.model import User


class UserAdmin(PageView, model=User):
    # can_delete = False
    name = 'Пользователь'
    name_plural = 'Пользователи'

    column_list = [
        User.id,
        User.name,
        User.username,
        User.email,
        User.is_superuser,
        User.created_at,
    ]

    column_sortable_list = column_list

    column_labels = {
        User.id: "ID",
        User.name: "Имя",
        User.username: "Имя пользователя",
        User.email: "Почта",
        User.hashed_password: "Хеш пароля",
        User.is_superuser: "Права администратора",
        User.created_at: "Создано",

    }
