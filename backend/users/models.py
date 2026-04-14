from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Тот самый телефон, который ты хотел
    phone = models.CharField(max_length=20, verbose_name="Номер телефона", blank=True, null=True)
    
    # Email делаем уникальным (удобно для логина)
    email = models.EmailField(unique=True, verbose_name="Email адрес")

    def __str__(self):
        return f"{self.username} ({self.first_name} {self.last_name})"