from decimal import Decimal

from rest_framework import serializers

from .models import Product, ProductVariant


class ProductVariantSerializer(serializers.ModelSerializer):
    def validate_price(self, value: Decimal) -> Decimal:
        if value < Decimal("0"):
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    class Meta:
        model = ProductVariant
        fields = ("id", "color", "color_code", "storage", "price", "image", "stock")
        read_only_fields = ("id",)


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    price = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "image",
            "variants",
            "created_at",
        )
        read_only_fields = ("id", "price", "image", "variants", "created_at")

    def get_price(self, obj: Product) -> Decimal:
        variant = obj.variants.first()
        return variant.price if variant else Decimal("0")

    def get_image(self, obj: Product) -> str | None:
        variant = obj.variants.first()
        return variant.image if variant else None
