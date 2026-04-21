from django.db import models
from django.conf import settings

# --- СТАРЫЕ МОДЕЛИ (Ты их, скорее всего, случайно удалил или не докопировал) ---
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(verbose_name="Общее описание товара")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    color = models.CharField(max_length=50, verbose_name="Цвет") 
    storage = models.CharField(max_length=20, verbose_name="Память") 
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.URLField(verbose_name="Ссылка на фото этого цвета")
    stock = models.PositiveIntegerField(default=0, verbose_name="Остаток на складе")

    def __str__(self):
        return f"{self.product.name} ({self.color} / {self.storage})"

# --- НОВЫЕ МОДЕЛИ (Заказы) ---
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Покупатель")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    is_paid = models.BooleanField(default=False, verbose_name="Оплачено")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Общая сумма")

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"Заказ №{self.id} — {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, verbose_name="Товар (вариант)")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена на момент покупки")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")

    def __str__(self):
        return f"{self.product_variant} x {self.quantity}"
    
#LALALA    