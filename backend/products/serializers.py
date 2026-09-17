from decimal import Decimal

from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    def validate_price(self, value: Decimal) -> Decimal:
        if value < Decimal("0"):
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "image", "created_at")
        read_only_fields = ("id", "created_at")
