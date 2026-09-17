from rest_framework import serializers

from products.serializers import ProductVariantSerializer

from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)
    product_variant_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product_variant",
            "product_variant_id",
            "quantity",
            "total_price",
        ]
