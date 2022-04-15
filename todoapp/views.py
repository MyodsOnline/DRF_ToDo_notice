from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, SimpleProjectModelSerializer
from .filters import ToDoFilter, ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectFilterViewSet(ModelViewSet):
    queryset = Project.objects.all()
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return SimpleProjectModelSerializer


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class CustomToDoFilterViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    # permission_classes = [IsAuthenticated]
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def perform_destroy(self, instance):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
