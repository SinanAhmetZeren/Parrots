# Generated by Django 3.2.7 on 2021-10-20 16:57

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0037_alter_auction_tripdetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='tripDetails',
            field=ckeditor.fields.RichTextField(default='', max_length=3000),
        ),
    ]
