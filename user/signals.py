from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile
from auction.models import Vehicle

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        Vehicle.objects.create(
            vehicle_type= "WALK",
            v_name = "Walk",
            v_description = "",
            v_capacity = 0,
            v_owner = instance
         )
        Vehicle.objects.create(
            vehicle_type= "RUN",
            v_name = "Run",
            v_description = "",
            v_capacity = 0,
            v_owner = instance
         )



@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
