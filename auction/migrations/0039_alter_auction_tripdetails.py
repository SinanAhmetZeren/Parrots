# Generated by Django 3.2.7 on 2021-10-20 17:34

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0038_alter_auction_tripdetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='tripDetails',
            field=ckeditor.fields.RichTextField(blank=True, max_length=3000, null=True),
        ),
    ]
