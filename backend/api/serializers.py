from rest_framework import serializers
from rest_framework import exceptions

from todo.models import Author, Post, Tag


class TagSerializer(serializers.ModelSerializer):

    def validate_name(self, value):
        if len(value) <= 3:
            raise exceptions.ValidationError(detail="Название тэга не должно быть меньше 4")
        return value

    class Meta:
        model = Tag
        fields = ('id', 'name')


class AuthorSerializer(serializers.ModelSerializer):

    def validate_name(self, value):
        if len(value) <= 3:
            raise exceptions.ValidationError(detail="Имя автора не должно быть меньше 4")
        return value

    class Meta:
        model = Author
        fields = ('id', 'name')


class PostSerializer(serializers.ModelSerializer):

    author = serializers.SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=Author.objects.all(),
    )
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Tag.objects.all(),
    )

    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'tags', 'date', 'is_made')
