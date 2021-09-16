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

class Vehicle(models.Model):
    class VehicleType(models.TextChoices):
        BOAT = "BOAT"
        CARAVAN = "CARAVAN"
        CAR = "CAR"
        BUS = "BUS"
        TINYHOUSE = "TINYHOUSE"
        # WALK = "WALK"
    vehicle_type = models.CharField(max_length=9,choices=VehicleType.choices,default=VehicleType.BOAT, verbose_name='Vehicle Type')
    v_name = CharField(max_length=30, verbose_name='Vehicle Name')
    v_description = CharField(max_length=200, verbose_name='Vehicle Description (200 characters max)')
    v_capacity = IntegerField(verbose_name='Vehicle Capacity (persons) ')
    v_owner = ForeignKey(User, on_delete=CASCADE)
    v_image = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image')
    v_image2 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image2')
    v_image3 = models.ImageField(default="defaultVehicle.jpg", verbose_name='Vehicle Image3')

    def __str__(self):
        return f'{self.vehicle_type}-{self.v_name}'

    def get_absolute_url(self):
        return reverse('auction:vehicle_detail', kwargs={'pk': self.pk})


class Auction(models.Model):
    class AuctionVehicleType(models.TextChoices):
        BOAT = "BOAT"
        CARAVAN = "CARAVAN"
        CAR = "CAR"
        BUS = "BUS"
        TINYHOUSE = "TINYHOUSE"
        # WALK = "WALK"
    vehicle = ForeignKey(Vehicle, on_delete=models.CASCADE)
    auctionImage = models.ImageField(default="default_auction.png", verbose_name='Auction Image')
    auctionVehicleType = models.CharField(max_length=9,choices=AuctionVehicleType.choices,default=AuctionVehicleType.BOAT, verbose_name='Vehicle Type')
    vacancy = IntegerField()
    Latitude = FloatField()
    Longitude = FloatField() 
    createdDAte = DateTimeField(auto_now_add= True)
    auctionEndDate = DateTimeField()
    trip_startDate = DateTimeField(default=datetime.now, blank=True)
    trip_endDate = DateTimeField(default=datetime.now, blank=True)
    tripDetails = CharField(max_length=3000, default="")

    def __str__(self):
        return f'{self.vehicle}, {self.id}'

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