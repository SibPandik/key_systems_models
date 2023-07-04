from rest_framework import serializers

from todo.models import Author, Post, Tag


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name')


class AuthorSerializer(serializers.ModelSerializer):

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
