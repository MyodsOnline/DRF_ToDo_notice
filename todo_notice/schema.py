import graphene
from graphene_django import DjangoObjectType

from users.models import User
from todoapp.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)

    user_by_id = graphene.Field(UserType, id=graphene.ID(required=True))
    project_by_name = graphene.Field(ProjectType, name=graphene.String(required=True))
    todo_by_project_id = graphene.Field(TodoType, id=graphene.ID(required=True))
    user_projects = graphene.List(ProjectType, id=graphene.ID(required=True))
    notes_by_user_name = graphene.Field(TodoType, username=graphene.String(required=True))

    def resolve_all_users (root, info):
        return User.objects.all()

    def resolve_all_projects (root, info):
        return Project.objects.all()

    def resolve_all_todos (root, info):
        return ToDo.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_project_by_name(self, info, name):
        try:
            return Project.objects.get(project_name=name)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_project_id(self, info, id):
        return ToDo.objects.get(project__id=id)

    def resolve_user_projects(root, info, id):
        return Project.objects.filter(workers__id=id)

    def resolve_notes_by_user_name(root, info, username):
        return ToDo.objects.get(created_by__username=username)


schema = graphene.Schema(query=Query)
