from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.generic.list import ListView
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm, ProfileUpdateForm2
from django.views.generic import DetailView
from django.contrib.auth.models import User
from django.shortcuts import get_list_or_404, render, get_object_or_404


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'user/register.html', {'form': form})


@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        # p_form = ProfileUpdateForm(request.POST,
        #                            request.FILES,
        #                            instance=request.user.profile)
        p_form2 = ProfileUpdateForm2(request.POST, 
                                    request.FILES,
                                    instance=request.user.profile)
        if u_form.is_valid() and p_form2.is_valid():
            u_form.save()
            # p_form.save()
            p_form2.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('profile')

    else:
        u_form = UserUpdateForm(instance=request.user)
        # p_form = ProfileUpdateForm(instance=request.user.profile)
        p_form2 = ProfileUpdateForm2(instance=request.user.profile)


    context = {
        'u_form': u_form,
        # 'p_form': p_form,
        "p_form2": p_form2,
    }
    return render(request, 'user/profile.html', context)


# # CREATE NEW VEHICLE
# class VehicleCreateView(LoginRequiredMixin, CreateView):
#     model = Vehicle
#     fields = ['vehicle_type', 'v_name', 'v_description', 'v_capacity', 'v_image','v_image2','v_image3', 'v_image4','v_image5','v_image6','v_image7','v_image8' ]
#     context_object_name = 'vehicle'
#     form = VehicleForm()

#     def form_valid(self, form):
#         form.instance.v_owner = self.request.user
#         return super().form_valid(form)



class publicProfile(ListView):
    model = User
    context_object_name = 'profile_users'

    def get_queryset(self):
        return User.objects.filter(username=self.kwargs.get('username'))
 