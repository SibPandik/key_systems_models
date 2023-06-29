from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=150, verbose_name='Имя')
    email = models.EmailField(verbose_name='Почта')

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=100, verbose_name='Заголовок')
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE, 
        verbose_name='Автор'
    )
    tags = models.ManyToManyField(Tag, verbose_name='Тэги')
    date = models.DateTimeField(auto_now_add=True, verbose_name='Дата')
    is_made = models.BooleanField(default=False, verbose_name='Готовность')

    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Записи'

    def get_tags(self):
        return " | ".join([p.name for p in self.tags.all()])

    def __str__(self):
        return self.title
