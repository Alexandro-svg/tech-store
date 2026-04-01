FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install django djangorestframework django-cors-headers
RUN pip install django djangorestframework django-cors-headers psycopg2-binary

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]