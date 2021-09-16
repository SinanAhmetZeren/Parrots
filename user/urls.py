from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views


# app_name = "user"

urlpatterns = [
    # USER RELATED
    path('register/', views.register, name='register'),    
    path('login/', auth_views.LoginView.as_view(template_name='user/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='user/logout.html'), name='logout'),


    # PROFILE
    path('profile/', views.profile, name='profile'),
    path('public_profile/<str:username>', views.publicProfile.as_view(template_name ="user/public_profile.html"), name='public_profile'),

    # path('authorarticles/<str:username>', views.authorArticlesView.as_view(), name = "authorArticles" ),


    path('password-reset/',
         auth_views.PasswordResetView.as_view(
             template_name='user/password_reset.html'),name='password_reset'),

    path('password-reset/done/',auth_views.PasswordResetDoneView.as_view(
        template_name='user/password_reset_done.html'),name='password_reset_done'),

    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(
             template_name='user/password_reset_confirm.html'),name='password_reset_confirm'),

    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(
             template_name='user/password_reset_complete.html'),name='password_reset_complete'),

   ]
