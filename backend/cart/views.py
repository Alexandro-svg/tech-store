from rest_framework import viewsets, permissions
from .models import CartItem
from .serializers import CartItemSerializer

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Отдаем корзину только текущего юзера
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # При сохранении привязываем товар к юзеру
        serializer.save(user=self.request.user)