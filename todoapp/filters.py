from django_filters import rest_framework as filters

from .models import ToDo, Project, User


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')
    workers = filters.ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Project
        fields = ['project_name', 'workers']


class ToDoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(queryset=Project.objects.all())
    text = filters.CharFilter(lookup_expr='contains')

    created_at__gt = filters.DateTimeFilter(field_name='created_at', lookup_expr='date__gt')
    created_at__lt = filters.DateTimeFilter(field_name='created_at', lookup_expr='date__lt')

    class Meta:
        model = ToDo
        fields = ['project', 'text', 'is_active', 'created_at']
