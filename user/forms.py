from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
from ckeditor.widgets import CKEditorWidget


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    # email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username']


# class ProfileUpdateForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = [ 'email','phone',"facebook", "instagram",'image']


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = [ 'email','phone',"facebook", "instagram",'image']
        # profile_info = forms.CharField(widget=CKEditorWidget())

class ProfileUpdateForm2(forms.ModelForm):
    class Meta:
        model = Profile
        # fields = [ "profile_info"]
        # fields = "__all__"
        fields = [ 'email',"profile_info",'phone',"facebook", "instagram",'image']
        profile_info = forms.CharField(widget=CKEditorWidget())


# class VehicleForm(forms.ModelForm):
#     class Meta:
#         model = Vehicle
#         # fields = ("tripDetails",)
#         fields = "__all__"
#         v_description = forms.CharField(widget=CKEditorWidget())