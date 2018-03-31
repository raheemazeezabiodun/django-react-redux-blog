from rest_framework import serializers

from blog.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255)
    slug = serializers.SlugField(max_length=255)
    content = serializers.CharField()

    class Meta:
        model = Blog
        fields = ('title', 'slug', 'content',)

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title': instance.title,
            'slug': instance.slug,
            'content': instance.content,
            'date_created': instance.date_created,
            'text': instance.blog_text,
            'image': instance.image
        }
