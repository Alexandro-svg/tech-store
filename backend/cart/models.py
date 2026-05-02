from django.db import models
from django.conf import settings
from products.models import ProductVariant # Импортируем твои варианты товаров

class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_items')
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} — {self.product_variant}"
    
    @property
    def total_price(self):
        return self.quantity * self.product_variant.price