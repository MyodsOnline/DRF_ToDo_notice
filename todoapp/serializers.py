from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField

from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    workers = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['uid', 'project_name', 'workers', 'repo_link']


class SimpleProjectModelSerializer(ModelSerializer):
    workers = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['project_name', 'workers']


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = SimpleProjectModelSerializer()
    created_by = StringRelatedField(many=False)

    class Meta:
        model = ToDo
        fields = ['id', 'project', 'created_by', 'text', 'is_active', 'updated_at']
