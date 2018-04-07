import base64
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lib.testUtils import CustomTestCase
from .test_models import BlogFactory, Blog
from .test_serializers import TestBlogSerializer
from tests.python.accounts.test_models import UserFactory
from tests.python.accounts.test_views import get_basic_auth_header


class TestBlogView(CustomTestCase, APITestCase):
    def setUp(self):
        self.maxDiff = None
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com',
                                       first_name='Test',
                                       last_name='User')
        self.user.set_password('test')
        self.user.save()


    def test_get_blog(self):
        # Ensure we can login with given credentials.
        url = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

        blog = BlogFactory.create()

        url = reverse('blog:blog')
        response = self.client.get(url)

        expected_response = [
            {
                'id': blog.id,
                'title': blog.title,
                'slug': blog.slug,
                'content': blog.content,
                'date_created': blog.date_created,
                'text': blog.blog_text,
                'image': blog.image
            }
        ]
        self.assertEqual(response.data, expected_response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_blog(self):
        url = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

        url = reverse('blog:blog')
        response = self.client.post(url, TestBlogSerializer.VALID_DATA_DICT[0])
        new_blog = Blog.objects.all()[0]
        expected_response = {
            'id': new_blog.id,
            'title': new_blog.title,
            'slug': new_blog.slug,
            'content': new_blog.content,
            'date_created': new_blog.date_created,
            'text': new_blog.blog_text,
            'image': new_blog.image
        }

        self.assertEqual(response.data, expected_response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Blog.objects.all().count(), 1)

