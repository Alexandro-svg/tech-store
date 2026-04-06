from django.urls import path
from .views import product_list, product_detail

urlpatterns = [
    path('', product_list),          # Пустота после api/products/
    path('<int:pk>/', product_detail), # ID после api/products/
]