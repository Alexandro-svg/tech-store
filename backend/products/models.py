from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    # Описание остается здесь! Оно общее для всей линейки iPhone 17
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