from uuid import uuid4

from django.db import models


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(max_length=64, verbose_name='username')
    firstname = models.CharField(max_length=64, verbose_name='firstname')
    lastname = models.CharField(max_length=64, verbose_name='lastname')
    email = models.EmailField(blank=False, unique=True, verbose_name='email')

    def __str__(self):
        return f'{self.username} - {self.email}'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
