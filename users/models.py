from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(blank=False, unique=True, verbose_name='email')

    def __str__(self):
        return f'{self.username} - {self.email}'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
