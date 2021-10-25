from os import truncate
from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.db.models.fields import BooleanField, IntegerField
from ckeditor.fields import RichTextField


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_info = RichTextField(max_length=800,blank=True, null=True, verbose_name='Profile Info (800 characters max)')
    email = models.EmailField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(default="defaultProfile.jpg", upload_to= "profile_images")
    facebook = models.CharField(max_length=200, blank=True, null=True)
    instagram = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        rgb_img = img.convert("RGB")
        rgb_img.save('defaultProfile.jpg')

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)



class Inboxfull(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f' bg-info bg-gradient {self.user.username}'
        # return f'{self.user.username} inboxfull'

        

