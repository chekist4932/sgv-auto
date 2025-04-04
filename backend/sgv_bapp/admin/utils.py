from PIL import Image
from io import BytesIO


def optimize_image_bytes(
        image_bytes: bytes,
        max_size: tuple[int, int] = (1920, 1080),
        quality: int = 75
) -> bytes:
    with Image.open(BytesIO(image_bytes)) as image:
        # Конвертируем в RGB, если нужно (для JPEG/WebP)
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        # Уменьшаем размер, если больше max_size
        image.thumbnail(max_size, Image.LANCZOS)

        # Определим формат
        im_format = image.format or 'JPEG'
        if im_format.upper() not in ['JPEG', 'JPG', 'PNG', 'WEBP']:
            im_format = 'JPEG'  # fallback

        # Сохраняем в байты
        output = BytesIO()
        save_kwargs = {
            "format": im_format,
            "optimize": True,
        }

        if im_format.upper() in ["JPEG", "JPG", "WEBP"]:
            save_kwargs["quality"] = quality

        image.save(output, **save_kwargs)
        return output.getvalue()
