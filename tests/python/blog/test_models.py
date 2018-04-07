import factory
from django.test import TestCase

from blog.models import Blog


class BlogFactory(factory.DjangoModelFactory):
    title = 'Blog post'
    slug = 'blog-post'
    is_active = True

    class Meta:
        model = Blog
        django_get_or_create = ('title',)


class BlogModelTest(TestCase):
    def setUp(self):
        self.blog = BlogFactory.create(title='Test blog post')

    def test_unicode(self):
        self.assertEqual(str(self.blog), 'Test blog post')
