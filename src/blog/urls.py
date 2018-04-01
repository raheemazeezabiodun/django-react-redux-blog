from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import blog.views

urlpatterns = [
    url(_(r'^$'), blog.views.FetchBlogView.as_view(), name='blog')
]
