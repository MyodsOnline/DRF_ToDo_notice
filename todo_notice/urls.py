from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from todoapp.views import ProjectFilterViewSet, CustomToDoFilterViewSet

router = DefaultRouter()
router.register('projects', ProjectFilterViewSet)
router.register('todo', CustomToDoFilterViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/1/users/', include('users.urls', namespace='1')),
    path('api/2/users/', include('users.urls', namespace='2')),
]
