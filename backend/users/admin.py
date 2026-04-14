from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Это "простой" вариант регистрации
# admin.site.register(User)

# А это продвинутый вариант, чтобы видеть телефон и email в списке
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Поля, которые будут видны в списке пользователей
    list_display = ('username', 'email', 'phone', 'is_staff')
    
    # Добавляем поле phone в форму редактирования пользователя
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone',)}),
    )