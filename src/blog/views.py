from rest_framework import status
from knox.auth import TokenAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from lib.utils import AtomicMixin
from blog.serializers import BlogSerializer
from blog.models import Blog


class FetchBlogView(GenericAPIView, AtomicMixin):
    serializer_class = BlogSerializer
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    def get(self, request):
        blog = Blog.objects.filter(is_active=True)
        serializer = self.get_serializer(blog, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_blog = serializer.save()
            response, status_code = self.get_serializer(new_blog).data, status.HTTP_201_CREATED
        else:
            response, status_code = serializer.errors, status.HTTP_400_BAD_REQUEST

        return Response(response, status=status_code)
