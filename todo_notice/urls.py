from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from todoapp.views import ProjectFilterViewSet, CustomToDoFilterViewSet


schema_view = get_schema_view(
    openapi.Info(
        title='traning_project',
        description='Includes users list, projects & notes',
        default_version='1',
        contact=openapi.Contact(email='sample@mail.xyz'),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
)

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

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
