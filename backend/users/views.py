from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    # Теперь только залогиненный юзер увидит свои данные
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        # Возвращаем именно того, кто сделал запрос по токену
        return self.request.user


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Тут оставляем AllowAny, чтобы любой мог зарегиться
    permission_classes = [permissions.AllowAny]
    authentication_classes = []