from rest_framework import serializers
from .models import Product, ProductVariant

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'color', 'storage', 'price', 'image', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    price = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'image', 'variants', 'created_at')

    def get_price(self, obj):
        variant = obj.variants.first()
        return variant.price if variant else 0

    def get_image(self, obj):
        variant = obj.variants.first()
        return variant.image if variant else None