from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import User
from .serializers import UserModelSerializer, AdvancedModelSerializer


class UserModelViewSet(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '1':
            return AdvancedModelSerializer
        return UserModelSerializer


class CustomUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
