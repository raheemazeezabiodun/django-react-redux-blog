from djangoreactreduxblog.settings.base import *    # NOQA (ignore all errors on this line)

DEBUG = True

PAGE_CACHE_SECONDS = 1

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'djangoreactreduxblog_dev',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': 5432,
    }
}

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dppgklcsv',
    'API_KEY': '149254849588689',
    'API_SECRET': 's_xjrK2F5FN4lSqnZcv6uSB8viw'
}

RAVEN_CONFIG = {
    'dsn': 'https://e36d36aa5b2744498fdc96d4b8be1cd6:10b70ff4601044afb07fc8e56c7377a2@sentry.io/285132'
}
