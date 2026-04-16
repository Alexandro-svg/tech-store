from django.urls import path
from .views import UserMeView, UserCreateView

urlpatterns = [
    path('me/', UserMeView.as_view(), name='user-me'),
    path('register/', UserCreateView.as_view(), name='user-register'), 
]