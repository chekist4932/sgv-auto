from sqladmin import ModelView


class PageView(ModelView):
    icon = "fa-solid fa-user"
    page_size = 100
    page_size_options = [25, 50, 100, 200]