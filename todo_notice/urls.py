"""todo_notice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import UserModelViewSet, CustomUserViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet, ProjectFilterViewSet, CustomToDoFilterViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('custom_users', CustomUserViewSet)
# router.register('projects', ProjectModelViewSet)
router.register('projects', ProjectFilterViewSet)
router.register('todo', CustomToDoFilterViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    # path('custom_users/', CustomUserViewSet.as_view({'get': 'list'}))
]
