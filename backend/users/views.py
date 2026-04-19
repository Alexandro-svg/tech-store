from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer


class UserMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        if self.request.user.is_anonymous:
            return User.objects.first()
        return self.request.user


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]