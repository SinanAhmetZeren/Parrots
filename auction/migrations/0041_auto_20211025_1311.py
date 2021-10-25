# Generated by Django 3.2.7 on 2021-10-25 10:11

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0040_auction_auction_brief'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='v_image7',
            field=models.ImageField(default='defaultVehicle.jpg', upload_to='', verbose_name='Vehicle Image7'),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='v_image8',
            field=models.ImageField(default='defaultVehicle.jpg', upload_to='', verbose_name='Vehicle Image8'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='v_description',
            field=ckeditor.fields.RichTextField(blank=True, max_length=3000, null=True, verbose_name='Vehicle Description (2000 characters max)'),
        ),
    ]