from django.urls import path

from . import views

urlpatterns = [
    path('', views.messagesView, name='messages'),
    path('create_message/', views.createMessageView.as_view(), name = "create_message" ),

]