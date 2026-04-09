from django.contrib import admin
from .models import Product, ProductVariant

# Эта штука выведет варианты (память/цвет) прямо внутри карточки товара
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 2  # сколько пустых строк показать сразу

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantInline]
    list_display = ('name', 'created_at')