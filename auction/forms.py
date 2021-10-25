from django.forms import fields, ModelForm
from django import forms
from .models import Vehicle, Bid, Auction
from ckeditor.widgets import CKEditorWidget


class VehicleUpdateForm(forms.ModelForm):
    class Meta:
        model = Vehicle
        fields = "__all__"
        exclude = ["v_owner"]
        

class NewBidForm(forms.ModelForm):
    class Meta:
        model = Bid
        fields = ('price', "introduction",)

class UpdateBidForm(forms.ModelForm):
    class Meta:
        model = Bid
        fields = ('price',"introduction",)
    # auction, user, price


class AuctionForm(forms.ModelForm):
    class Meta:
        model = Auction
        # fields = ("tripDetails",)
        fields = "__all__"
        tripDetails = forms.CharField(widget=CKEditorWidget())



class VehicleForm(forms.ModelForm):
    class Meta:
        model = Vehicle
        # fields = ("tripDetails",)
        fields = "__all__"
        v_description = forms.CharField(widget=CKEditorWidget())