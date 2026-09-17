from decimal import Decimal

from django.core.management import call_command
from django.db import IntegrityError, transaction
from django.test import SimpleTestCase, TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product
from .serializers import ProductSerializer


class ProductListAPITests(APITestCase):
    url = "/api/products/"

    def test_get_returns_product_list(self):
        product = Product.objects.create(
            name="Test product",
            description="Product description",
            price=Decimal("99.99"),
            image="https://example.com/product.jpg",
        )

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["id"], product.id)
        self.assertEqual(response.data[0]["name"], product.name)

    def test_post_creates_product_and_returns_201(self):
        payload = {
            "name": "New product",
            "description": "Product description",
            "price": "149.99",
            "image": "https://example.com/product.jpg",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(response.data["name"], payload["name"])
        self.assertEqual(response.data["price"], payload["price"])

    def test_post_with_negative_price_returns_400(self):
        payload = {
            "name": "Invalid product",
            "description": "Product description",
            "price": "-1.00",
            "image": "https://example.com/product.jpg",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("price", response.data)
        self.assertEqual(Product.objects.count(), 0)


class ProductSerializerTests(SimpleTestCase):
    def test_negative_price_is_invalid(self):
        serializer = ProductSerializer(
            data={
                "name": "Invalid product",
                "description": "Product description",
                "price": "-0.01",
                "image": "https://example.com/product.jpg",
            }
        )

        self.assertFalse(serializer.is_valid())
        self.assertIn("price", serializer.errors)


class ProductModelConstraintTests(TestCase):
    def test_database_rejects_negative_price(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            Product.objects.create(
                name="Invalid product",
                description="Product description",
                price=Decimal("-0.01"),
                image="https://example.com/product.jpg",
            )


class ProductFixtureTests(TestCase):
    def test_demo_fixture_loads(self):
        call_command("loaddata", "products", verbosity=0)

        self.assertEqual(Product.objects.count(), 3)
        self.assertTrue(
            Product.objects.filter(name="Aurora Wireless Headphones").exists()
        )
