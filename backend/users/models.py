from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, verbose_name="Номер телефона", blank=True, null=True)
    email = models.EmailField(unique=True, verbose_name="Email адрес")
    
    # Тот самый адрес доставки
    address = models.TextField(verbose_name="Адрес доставки", blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.first_name} {self.last_name})"