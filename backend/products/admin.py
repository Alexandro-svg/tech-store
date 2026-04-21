from django.contrib import admin
from .models import Product, ProductVariant, Order, OrderItem 

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 2

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantInline]
    list_display = ('name', 'created_at')


admin.site.register(Order)
admin.site.register(OrderItem)