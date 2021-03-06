# Generated by Django 3.1.7 on 2021-08-23 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0011_auto_20210823_1639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='v_capacity',
            field=models.IntegerField(verbose_name='Vehicle Capacity (persons) '),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='v_description',
            field=models.CharField(max_length=200, verbose_name='Vehicle Description (200 characters max)'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='v_image',
            field=models.ImageField(default='defaultVehicle.jpg', upload_to='', verbose_name='Vehicle Image'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='v_name',
            field=models.CharField(max_length=30, verbose_name='Vehicle Name'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='vehicle_type',
            field=models.CharField(choices=[('Boat', 'Boat'), ('Caravan', 'Caravan'), ('Car', 'Car')], default='Boat', max_length=8, verbose_name='Vehicle Type'),
        ),
    ]
