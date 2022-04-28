from django.db import models
from uuid import uuid4

from users.models import User


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    project_name = models.CharField(max_length=64, verbose_name='Project name')
    repo_link = models.URLField(unique=True, verbose_name='Link to Git')
    workers = models.ManyToManyField(User, verbose_name='Workers')

    def __str__(self):
        return f'Project name - "{self.project_name}"'


class ToDo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, verbose_name='Related project')
    text = models.TextField(verbose_name='ToDo note text')
    created_by = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Note author')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created at')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated at')
    is_active = models.BooleanField(default=True, verbose_name='ToDo is active')

    def __str__(self):
        return f'{self.project} note: {self.text}'
