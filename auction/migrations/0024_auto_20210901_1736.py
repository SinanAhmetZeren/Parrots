# Generated by Django 3.1.7 on 2021-09-01 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0023_auto_20210901_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='tripDetails',
            field=models.CharField(default='', max_length=3000),
        ),
    ]
