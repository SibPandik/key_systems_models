from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()

    def __str__(self):
        return self.name
    

class Tag(models.Model):
    tag = models.CharField(max_length=50)

    def __str__(self):
        return self.tag
    

class Post(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    date = models.DateTimeField(auto_now_add=True)
    is_made = models.BooleanField(default=False)

    def get_tags(self):
        return " | ".join([p.tag for p in self.tags.all()])

    def __str__(self):
        return self.title
    
