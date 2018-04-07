import uuid

import base64
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lib.testUtils import CustomTestCase
from .test_models import UserFactory


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(('%s:%s' % (username, password)).encode('ascii')).decode()


class AccountTests(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'email': 'emailwilllogin@mydomain.com',
                  'password': 'teste'},
         'error': ('non_field_errors', ['Unable to login with provided credentials.']),
         'label': 'Invalid login credentials.',
         'method': 'POST',
         'status': status.HTTP_401_UNAUTHORIZED
         },
    ]
    VALID_DATA_DICT = [
        {'email': 'emailwilllogin@mydomain.com', 'password': 'test'},
    ]

    def setUp(self):
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com',
                                       first_name='Test',
                                       last_name='User')
        self.user.set_password('test')
        self.user.save()
        self.user_2 = UserFactory.create(email='emailwilllogininserializer@mydomain.com')

    def test_account_login_unsuccessful(self):
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'wrong'))
        response = self.client.post(reverse('accounts:login'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_login_successful(self):
        # Ensure we can login with given credentials.
        url = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
