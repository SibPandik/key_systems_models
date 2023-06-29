from django.contrib import admin
from .models import Tag, Author, Post


class TagConfig(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_editable = ('name',)
    list_filter = ('id',)


admin.site.register(Tag, TagConfig)


class AuthorConfig(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')
    list_editable = ('name',)
    list_filter = ('id', 'name')
    search_fields = ('name',)


admin.site.register(Author, AuthorConfig)


class PostConfig(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'get_tags', 'date', 'is_made')
    list_editable = ('title', 'author', 'is_made')
    list_filter = ('id', 'title')
    search_fields = ('title', 'author', 'tags', 'is_made')


admin.site.register(Post, PostConfig)
