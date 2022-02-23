from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    help = 'Fill database with users'

    def handle(self, *args, **options):
        User.objects.create_superuser(
            username='diver',
            email='diver@vlz.com',
            password='9501',
        )
        User.objects.create_user(
            username='olonnacs',
            first_name='Sebastian',
            last_name='Davies',
            email='olonnacs@cispeto.com',
        )
        User.objects.create_user(
            username='vaughn',
            first_name='Vanessa',
            last_name='Vaughn',
            email='vaughn@famism.biz',
        )
        User.objects.create_user(
            username='price6791',
            first_name='Candice',
            last_name='Needham',
            email='price6791@gmail.com',
        )
