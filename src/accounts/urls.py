from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import accounts.views

urlpatterns = [
    url(_(r'^login/$'),
        accounts.views.UserLoginView.as_view(),
        name='login'),
]
