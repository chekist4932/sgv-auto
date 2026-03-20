export const navLinks = [
    {
        label: "Каталог",
        type: "route",
        path: "/china",
        submenu: [
            { label: "Авто из Китая", type: "route", path: "/catalog/china" },
            { label: "Авто из Кореи", type: "route", path: "/catalog/korea" },
        ],
    },
    { label: "Наши работы", type: "route", path: "/sold" },
    { label: "Отзывы", type: "scroll", target: "review" },
    { label: "О нас", type: "scroll", target: "about" },
    { label: "В наличии", type: "scroll", target: "cars_in_stock" },
    { label: "Новости", type: "scroll", target: "news" },
];