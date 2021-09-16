import django_filters
from django_filters import DateFilter, NumberFilter, CharFilter

from .models import *

class AuctionFilter(django_filters.FilterSet):
    trip_startDate = DateFilter(field_name="trip_startDate", lookup_expr="gte")
    trip_endDate = DateFilter(field_name="trip_endDate", lookup_expr="lte")
    vacancy = NumberFilter(field_name="vacancy", lookup_expr="gte")
    auctionVehicleType = CharFilter(field_name="auctionVehicleType", lookup_expr="iexact")

    class Meta:
        model = Auction
        fields = ["vacancy", "trip_startDate", "trip_endDate", "auctionVehicleType"]
