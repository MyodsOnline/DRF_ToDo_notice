from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField

from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    workers = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class SimpleProjectModelSerializer(ModelSerializer):
    workers = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['project_name', 'workers', 'url']


class ToDoModelSerializer(ModelSerializer):
    project = SimpleProjectModelSerializer()
    created_by = StringRelatedField(many=False)

    class Meta:
        model = ToDo
        fields = '__all__'
