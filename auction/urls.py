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
    path('uservehicles/<str:username>/', views.UserVehiclesView, name='uservehicles'),
    path('vehicles/delete/<int:pk>', views.vehicleDeleteView.as_view(), name = "vehicle_delete" ),

    # AUCTION 
    path('voyages/create/', views.AuctionCreateView.as_view(), name = "auction_create" ),
    # creates new auction
    path('voyages/create_itinerary/<int:pk>/', views.CreateItineraryView, name = "auction_detail"),
    # page for adding itinerary !!!
    path('voyages/<int:pk>/', views.view_auction, name = "view_auction" ),
    # creates itinerary for given auction.  
    path('voyages/update/<int:pk>/', views.AuctionUpdateView.as_view(), name = "auction_update" ),
    # updates existing auction
    path('voyages/myvoyages/', views.myAuctionsView, name = "my_auctions" ),
    # displays user's own auctions
    path('voyages/delete/<int:pk>/', views.auctionDeleteView.as_view(), name = "auction_delete" ),
    # displays another user's auctions
    path('voyages/uservoyages/<str:username>/', views.UserAuctionsView, name = "user_auctions" ),


    # BIDS
    path('voyages/<int:pk>/createbid/', views.bidCreateView.as_view(), name = "bid_create" ),
    # create yaparken pk auction'a ait
    path('voyages/<int:pk>/updatebid/', views.bidUpdateView.as_view(), name = "bid_update" ),
    # update yaparken pk bid'e ait
    path('voyages/mybids/', views.myBidsView, name = "my_bids" ),

    # WAYPOINTS
    path('voyages/<int:pk>/createwaypoint/', views.WaypointCreateView.as_view(), name = "waypoint_create" ),
    

]
