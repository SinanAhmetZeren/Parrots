from django.contrib import admin
from .models import Vehicle, Auction, Bid, Waypoints

admin.site.register(Vehicle)
admin.site.register(Auction)
admin.site.register(Bid)
admin.site.register(Waypoints)

