# Generated by Django 3.1.7 on 2021-08-17 16:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_type', models.CharField(choices=[('JANUARY', 'Boat'), ('FEBRUARY', 'Caravan'), ('MAR', 'Car')], default='JANUARY', max_length=8)),
                ('v_name', models.TextField(max_length=30)),
                ('v_description', models.TextField(max_length=200)),
                ('v_capacity', models.IntegerField()),
                ('v_image', models.ImageField(default='defaultImage.jpg', upload_to='')),
                ('v_owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]