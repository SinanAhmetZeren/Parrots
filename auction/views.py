from django.contrib.auth.models import User
from django.db.models.base import Model
from .models import Auction, Bid, Vehicle, Waypoints
from django.shortcuts import render
from django.views.generic import (ListView,DetailView,CreateView,UpdateView,DeleteView)
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .filters import AuctionFilter
from django.shortcuts import render,HttpResponse,redirect,get_object_or_404,reverse
from .forms import VehicleUpdateForm, NewBidForm, UpdateBidForm
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy



# MAIN PAGE DEFAULT 
def mainPageView(request):
    datenow = datetime.now()
    auctions = Auction.objects.filter(auctionEndDate__gte=datenow)
    filter = AuctionFilter(request.GET, queryset=auctions)
    auctions = filter.qs 
    context = {
        "auctions":auctions,
        "filter": filter,
    }
    return render(request, "auction/mainpage.html", context)

# VIEWING AUCTION DETAILS FROM NORMAL LINKS
def view_auction(request, pk):
    auction = get_object_or_404(Auction, id = pk)
    new_bid_form = NewBidForm(request.POST or None)
    update_bid_form = UpdateBidForm(request.POST or None)
    # waypoints = Waypoints.objects.filter(auction=auctions)
    data = {}
    if request.is_ajax():
        if new_bid_form.is_valid():
            new_bid_form.save()
            data['name'] = new_bid_form.cleaned_data.get('name')
            data['status'] = 'ok'
            return JsonResponse(data)
        if update_bid_form.is_valid():
            update_bid_form.save()
            data['name'] = update_bid_form.cleaned_data.get('name')
            data['status'] = 'ok'
            return JsonResponse(data)
    context = {
        "new_bid_form":new_bid_form,
        "update_bid_form":update_bid_form,
        "object":auction,
    }
    return render(request, "auction/auction_view.html", context)


# DISPLAYING USER'S OWN AUCTIONS
def myAuctionsView(request):
    auctions = Auction.objects.filter(vehicle__in=request.user.vehicle_set.all())
    context = {
        "auctions":auctions,
    }
    return render(request, "auction/mainpage.html", context)


# CREATE NEW AUCTION
class AuctionCreateView(LoginRequiredMixin, CreateView):
    model = Auction
    fields = ['vehicle', 'vacancy', 'Latitude', 'Longitude', 'trip_startDate','trip_endDate', 'tripDetails', 'auctionEndDate',"auctionImage"]
    context_object_name = 'auction'
    # success_url = reverse_lazy('auction:create_itinerary') # kwargs={"pk": pk}


    def form_valid(self, form):
        form.instance.auctionVehicleType = form.instance.vehicle.vehicle_type
        return super().form_valid(form)


# CREATE WAYPOINTS -> REDIRECTS FROM CREATE AUCTION PAGE
def CreateItineraryView(request, pk):
    auction = Auction.objects.get(id=pk)
    context = {
        "auction": auction,
    }
    return render(request, "auction/auction_detail.html", context )


# UPDATING AUCTION INFORMATION
class AuctionUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Auction
    fields = ['vehicle', 'vacancy', 'Latitude', 'Longitude', 
    'trip_startDate','trip_endDate', 'tripDetails', 'auctionEndDate',"auctionImage"]
    # auctionImage,  auctionVehicleType,  ,  
    # createdDAte, , , , 

    def form_valid(self, form):
        form.instance.v_owner = self.request.user
        return super().form_valid(form)

    def test_func(self):
        auction = self.get_object()
        if self.request.user == auction.vehicle.v_owner:
            return True
        return False



class auctionDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Auction
    success_url = reverse_lazy("auction:mainpage")

    def test_func(self):
        auction = self.get_object()
        if self.request.user == auction.vehicle.v_owner:
            return True
        return False





# CREATE NEW VEHICLE
class VehicleCreateView(LoginRequiredMixin, CreateView):
    model = Vehicle
    fields = ['vehicle_type', 'v_name', 'v_description', 'v_capacity', 'v_image','v_image2','v_image3' ]
    context_object_name = 'vehicle'

    def form_valid(self, form):
        form.instance.v_owner = self.request.user
        return super().form_valid(form)

# UPDATE VEHICLE INFORMATION
class VehicleUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Vehicle
    fields = ['vehicle_type', 'v_name', 'v_description', 'v_capacity', "v_image",'v_image2','v_image3' ]
    # vehicle_type, v_name, v_description, v_capacity, v_owner, v_image

    def form_valid(self, form):
        form.instance.v_owner = self.request.user
        return super().form_valid(form)

    def test_func(self):
        vehicle = self.get_object()
        if self.request.user == vehicle.v_owner:
            return True
        return False

    # def get_initial(self):
    #     return {'vehicle_type':'vehicle_type', 'v_name':'v_name', 'v_description':'v_description', 'v_capacity':'v_capacity', "v_image":"v_image"}

class vehicleDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Vehicle
    success_url = reverse_lazy("auction:mainpage")

    def test_func(self):
        vehicle = self.get_object()
        if self.request.user == vehicle.v_owner:
            return True
        return False



# VIEW SINGLE VEHICLE DETAILS
def vehicle_detail_view(request, pk):
    vehicle = get_object_or_404(Vehicle, id = pk)
    if request.method == 'POST':
        form = VehicleUpdateForm(request.POST or None, instance = vehicle)
        if form.is_valid():
            form.save()
            # messages.success(request, f'Your account has been updated!')
            return redirect('mainpage')
    context = {
        "vehicle":vehicle,
    }
    return render(request, "auction/vehicle_detail.html", context)


# DISPLAY USER'S OWN VEHICLES
@login_required
def myvehicles(request):
    myvehicles = Vehicle.objects.filter(v_owner=request.user)
    context = {
        "myvehicles": myvehicles,
    }
    return render(request, 'auction/myvehicles.html', context)

@login_required
def myBidsView(request):
    mybids = Bid.objects.filter(user=request.user)
    context = {
        "mybids": mybids,
    }
    return render(request, 'auction/mybids.html', context)

def howto(request):
    return render(request, "auction/howto.html")



# CREATE BID FOR AN AUCTION, USED BY AJAX
class bidCreateView(LoginRequiredMixin, CreateView):
    model = Bid
    fields = ["auction","price", "introduction"]
    context_object_name = 'bid'
# auction / price / user / datecreated

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

        
# UPDATE BID FOR AN AUCTION
class bidUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Bid
    fields = ["auction","price", "introduction"]
    context_object_name = 'bid'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def test_func(self):
        bid = self.get_object()
        if self.request.user == bid.user:
            return True
        return False


class WaypointCreateView(LoginRequiredMixin, CreateView):
    model = Waypoints
    fields = ["auction","trip"]
    context_object_name = 'waypoint'


    # def form_valid(self, form):
    #     form.instance.auction = self.request.user
    #     return super().form_valid(form)