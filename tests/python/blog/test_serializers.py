from rest_framework import status
from rest_framework.test import APITestCase

from lib.testUtils import CustomTestCase
from blog.serializers import BlogSerializer


class TestBlogSerializer(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {
            'data': {
                'title': 'A blog post title',
                'slug': 'A blog post slug',
                'content': 'Some content'
            },
            'error': ('slug', ['Enter a valid "slug" consisting of letters, numbers, underscores or hyphens.']),
            'label': 'Invalid slug.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST
        }
    ]

    VALID_DATA_DICT = [
        {
            'title': 'A blog post title',
            'slug': 'a-blog-post-title',
            'content': 'some content'
        }
    ]

    def setUp(self):
        self.required_fields = ['title', 'slug', 'content']
        self.not_required_fields = []

    def test_fields(self):
        serializer = BlogSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = BlogSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_valid_data(self):
        serializer = BlogSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)
