from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    help = 'Fill database with users'

    def handle(self, *args, **options):
        User.objects.create(
            username='olonnacs',
            firstname='Sebastian',
            lastname='Davies',
            email='olonnacs@cispeto.com',
        )
        User.objects.create(
            username='vaughn',
            firstname='Vanessa',
            lastname='Vaughn',
            email='vaughn@famism.biz',
        )
        User.objects.create(
            username='price6791',
            firstname='Candice',
            lastname='Needham',
            email='price6791@gmail.com',
        )
