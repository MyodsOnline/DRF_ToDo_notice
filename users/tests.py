from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory, APIClient, APITestCase, APISimpleTestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .models import User
from todoapp.models import Project, ToDo
from .views import UserModelViewSet
from todoapp.views import ProjectFilterViewSet, CustomToDoFilterViewSet


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectFilterViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'User_next', 'email': 'user@mail.com'}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_project_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'project_name': 'project_test', 'repo_link': 'repo_link_1'}, format='json')
        view = ProjectFilterViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_user_admin(self):
        factory = APIRequestFactory()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        request = factory.post('/api/users/', {'username': 'User_next', 'email': 'user@mail.com'}, format='json')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_detail(self):
        user = User.objects.create(username='User_next', email='user@mail.com')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(username='User_next', email='user@mail.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'email': 'user_2@mail.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_user_admin(self):
        user = User.objects.create(username='User_next', email='user@mail.com')
        client = APIClient()
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'username': 'Updated_user', 'email': 'updated@mail.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'Updated_user')
        self.assertEqual(user.email, 'updated@mail.com')
        client.logout()

    def test_edit_project_admin(self):
        project = Project.objects.create(project_name='project_test', repo_link='project_test_url')
        client = APIClient()
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        print(User.objects.all())
        print(Project.objects.all())
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/projects/{project.id}/', {'project_name': 'Updated_project'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.project_name, 'Updated_project')
        client.logout()


class TestProjectViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_edit_admin(self):
        user = User.objects.create(username='test_user', email='user@mail.com')
        project = Project.objects.create(project_name='project_test', repo_link='project_test_url')
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/', {'project_name': 'updated_project_test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        print(project.project_name)
        self.assertEqual(project.project_name, 'updated_project_test')

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/',
                                   {'project_name': 'project_test', 'repo_link': 'project_test_url'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.project_name, 'project_test')

    def test_get_project_detail(self):
        project = mixer.blend(Project, workers__username='Test_user')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        print(response_project)
        self.assertEqual(response_project['workers'], ['Test_user'])
