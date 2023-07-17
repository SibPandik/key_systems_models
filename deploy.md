Вообще деплой костыльный сильно получился из-за того что доступа нет к настройками nginx. 

1. Собрали статику фронта, поместили в корень репозитория (Пришлось вручную загружать, потому что нет nodejs)
2. Cобрали статику бэка, поместили ее в папку статики фронта

```
key_systems_models/
└ venv/
└ backend/
└ frontend/
└ dist/
  └ static/
    └ admin/
    └ rest_framework/
  └ css/
  └ js/
  └ index.html
```

3. Так как доступа к настройкам nginx нет (файл unwritable) и любой запрос в любом случае идет на бэк - прокинул пустые html на эндпоинты "/" и "login/", чтобы джанго не ругалась 404
```
from django.views.generic import TemplateView

urlpatterns = [
  ...
  path("login/", TemplateView.as_view(template_name="index.html")),
  path("/", TemplateView.as_view(template_name="index.html")),
]
```
5. На pythonanywhere добавили на эти эндпоинты раздачу статики фронта

```
   Url          Directory
   /static/     /home/pandikk/key_systems_models/dist/static/
   /            /home/pandikk/key_systems_models/dist/
   /login/      /home/pandikk/key_systems_models/dist/
```
