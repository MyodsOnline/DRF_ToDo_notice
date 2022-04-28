"""
    this file was created for token-check
"""

import requests

user_data = {'username': 'diver', 'password': '9501'}

response = requests.post('http://127.0.0.1:8081/api-token-auth/',
                         data=user_data)

print(response.status_code)
# 200
print(response.json())
# {'token': 'e4e1b47ac533b034b95f80c190f00897c8298e47'}
