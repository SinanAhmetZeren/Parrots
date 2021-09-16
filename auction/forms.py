from django import forms
from .models import Vehicle, Bid

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
