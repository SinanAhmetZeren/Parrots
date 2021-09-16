from django.urls import path
from . import views

app_name = "auction"

urlpatterns = [
    # MAIN PAGE
    path('', views.mainPageView, name = "mainpage" ),
    path('navigation/', views.howto, name = "howto" ),

    # VEHICLES
    path('vehicles/<int:pk>/', views.vehicle_detail_view, name = "vehicle_detail" ),    # path('subjects/create/', views.subjectCreateView.as_view(success_url="/subjects/"), name = "subjectCreate" ),
    path('vehicles/create/', views.VehicleCreateView.as_view(), name = "vehicle_create" ),
    path('vehicles/update/<int:pk>', views.VehicleUpdateView.as_view(), name = "vehicle_update" ),
    path('myvehicles/', views.myvehicles, name='myvehicles'),
    path('vehicles/delete/<int:pk>', views.vehicleDeleteView.as_view(), name = "vehicle_delete" ),

    # AUCTION 
    path('auctions/create/', views.AuctionCreateView.as_view(), name = "auction_create" ),
    # creates new auction
    path('auctions/create_itinerary/<int:pk>/', views.CreateItineraryView, name = "auction_detail"),
    # page for adding itinerary !!!
    path('auctions/<int:pk>/', views.view_auction, name = "view_auction" ),
    # creates itinerary for given auction.  
    path('auctions/update/<int:pk>/', views.AuctionUpdateView.as_view(), name = "auction_update" ),
    # updates existing auction
    path('auctions/myauctions/', views.myAuctionsView, name = "my_auctions" ),
    # displays user's auctions
    path('auctions/delete/<int:pk>/', views.auctionDeleteView.as_view(), name = "auction_delete" ),


    # BIDS
    path('auctions/<int:pk>/createbid/', views.bidCreateView.as_view(), name = "bid_create" ),
    # create yaparken pk auction'a ait
    path('auctions/<int:pk>/updatebid/', views.bidUpdateView.as_view(), name = "bid_update" ),
    # update yaparken pk bid'e ait
    path('auctions/mybids/', views.myBidsView, name = "my_bids" ),

    # WAYPOINTS
    path('auctions/<int:pk>/createwaypoint/', views.WaypointCreateView.as_view(), name = "waypoint_create" ),
    

]
