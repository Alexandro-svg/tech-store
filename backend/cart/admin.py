from django.contrib import admin
from .models import CartItem

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    
    list_display = ('user', 'product_variant', 'quantity', 'added_at')
    
   
    list_filter = ('user', 'added_at')
    
    
    search_fields = ('user__username', 'product_variant__color')