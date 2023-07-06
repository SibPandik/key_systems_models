from rest_framework.routers import DefaultRouter

from django.urls import include, path

from .views import PostViewSet, AuthorsViewSet, TagViewSet


router_v1 = DefaultRouter()
router_v1.register(r'todo', PostViewSet, basename='todo')
router_v1.register(r'authors', AuthorsViewSet, basename='authors')
router_v1.register(r'tags', TagViewSet, basename='tags')


urlpatterns = [
    path('', include(router_v1.urls))
]
