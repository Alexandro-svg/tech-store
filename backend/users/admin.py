from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Добавляем 'phone' и 'address' в список, чтобы видеть их сразу во всей таблице
    list_display = ('username', 'email', 'phone', 'address', 'is_staff')
    
   
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительная информация', {'fields': ('phone', 'address')}),
    )
    
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Дополнительная информация', {'fields': ('phone', 'address')}),
    )