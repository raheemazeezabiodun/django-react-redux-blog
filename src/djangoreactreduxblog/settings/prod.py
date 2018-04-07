from djangoreactreduxblog.settings.base import *  # NOQA (ignore all errors on this line)


CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'your_cloud_name',
    'API_KEY': 'your_api_key',
    'API_SECRET': 'your_api_secret'
}

RAVEN_CONFIG = {
    'dsn': 'your dsn',
}
