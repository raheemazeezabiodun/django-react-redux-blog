import os

from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings

from lib.utils import AtomicMixin
from accounts.serializers import UserSerializer


class UserLoginView(AtomicMixin, GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User login with username and password."""
        token = AuthToken.objects.create(request.user)
        data = {
            'user': self.get_serializer(request.user).data,
            'token': token
        }
        return Response(data, status=status.HTTP_200_OK)


class IndexView(View):
    def get(self, request):
        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())

