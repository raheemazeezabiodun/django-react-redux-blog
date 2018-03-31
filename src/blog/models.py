import uuid

from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField
from bs4 import BeautifulSoup


class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # pylint: disable=invalid-name
    slug = models.SlugField(max_length=255)
    title = models.CharField(max_length=255)
    content = RichTextUploadingField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    meta_description = models.TextField()

    def __str__(self):
        """String Representation."""
        return self.title

    class Meta:
        ordering = ['-date_created']

    @property
    def image(self):
        try:
            soup = BeautifulSoup(self.content, 'html.parser')
            image = soup.select('img')[0]
        except:
            return None
        return str(image['src'])

    @property
    def blog_text(self):
        soup = BeautifulSoup(self.content, 'html.parser')
        return soup.get_text()
