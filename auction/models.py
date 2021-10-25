from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.enums import Choices, IntegerChoices, TextChoices
from django.db.models.expressions import OrderBy
from django.db.models.fields import CharField, DateTimeField, FloatField, IntegerField, TextField
from django.db.models.fields.files import ImageField
from django.db.models.fields.related import ForeignKey, OneToOneField
from django.contrib.auth.models import User
from datetime import datetime    
from django.urls import reverse
from ckeditor.fields import RichTextField


class Vehicle(models.Model):
    class VehicleType(models.TextChoices):
        BOAT = "BOAT"
        CARAVAN = "CARAVAN"
        CAR = "CAR"
        BUS = "BUS"
        WALK = "WALK"
        RUN = "RUN"
        BICYCLE = "BICYCLE"
        MOTORCYCLE = "MOTORCYCLE"
        TINYHOUSE = "TINYHOUSE"
    vehicle_type = models.CharField(max_length=10,choices=VehicleType.choices,default=VehicleType.BOAT, verbose_name='Vehicle Type')
    v_name = CharField(max_length=30, verbose_name='Vehicle Name')
    v_description = RichTextField(max_length=3000,blank=True, null=True, verbose_name='Vehicle Description (2000 characters max)')
    # v_description = CharField(max_length=2000, verbose_name='Vehicle Description (2000 characters max)')
    v_capacity = IntegerField(verbose_name='Vehicle Capacity (persons) ')
    v_owner = ForeignKey(User, on_delete=CASCADE)
    v_image = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image')
    v_image2 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image2')
    v_image3 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image3')
    v_image4 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image4')
    v_image5 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image5')
    v_image6 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image6')
    v_image7 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image7')
    v_image8 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image8')


    def __str__(self):
        return f'{self.v_owner} s {self.vehicle_type.lower()}: {self.v_name}'

    def get_absolute_url(self):
        return reverse('auction:vehicle_detail', kwargs={'pk': self.pk})


class Auction(models.Model):
    class AuctionVehicleType(models.TextChoices):
        
        BOAT = "BOAT"
        CARAVAN = "CARAVAN"
        CAR = "CAR"
        BUS = "BUS"
        WALK = "WALK"
        RUN = "RUN"
        BICYCLE = "BICYCLE"
        MOTORCYCLE = "MOTORCYCLE"
        TINYHOUSE = "TINYHOUSE"
    owner = ForeignKey(User, on_delete=models.CASCADE,default=None, blank=True, null=True)
    vehicle = ForeignKey(Vehicle, on_delete=models.CASCADE)
    auction_title = CharField(max_length=50, default="")
    auction_brief = CharField(max_length=180, default="")
    auctionImage = models.ImageField(default="default_auction.png", verbose_name='Auction Image')
    auctionVehicleType = models.CharField(max_length=10,choices=AuctionVehicleType.choices,default=AuctionVehicleType.BOAT, verbose_name='Vehicle Type')
    vacancy = IntegerField()
    Latitude = FloatField()
    Longitude = FloatField() 
    createdDAte = DateTimeField(auto_now_add= True)
    auctionEndDate = DateTimeField()
    trip_startDate = DateTimeField(default=datetime.now, blank=True)
    trip_endDate = DateTimeField(default=datetime.now, blank=True)
    minPrice = IntegerField(default=0)
    tripDetails = RichTextField(max_length=3000,blank=True, null=True)

    def __str__(self):
        return f'"{self.auction_title}"" by {self.owner} - id: {self.id}'

    def get_absolute_url(self):
        return reverse('auction:auction_detail', kwargs={'pk': self.pk})

    # def bid_set_has_user(auction_bidset, user):
    #     return auction_bidset.filter(user=user)

class Bid(models.Model):
    auction = ForeignKey(Auction, on_delete=models.CASCADE)
    user = ForeignKey(User, on_delete=models.CASCADE)
    price = IntegerField()
    bidCreated = DateTimeField(auto_now_add=True)
    introduction = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-price']
        
    def __str__(self):
        return f'{self.auction}-{self.user}-{self.price}'

    def get_absolute_url(self):
        return reverse('auction:mainpage')


class Waypoints(models.Model):
    auction = OneToOneField(Auction, on_delete=models.CASCADE, unique=True)
    trip = models.TextField(blank=True, null=True)
        
    def __str__(self):
        return f'{self.auction} waypoints'

    def get_absolute_url(self):
        return reverse('auction:mainpage')