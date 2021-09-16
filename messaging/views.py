from django.shortcuts import render
from .models import Message
from django.contrib.auth.models import User
from user.models import Inboxfull
from django.db.models import Q
from django.views.generic import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

# Create your views here.

def messagesView(request):
    all_messages = Message.objects.filter(Q(received_by = request.user) | Q(sent_by = request.user) ).order_by('-createdDate')
    
    unique_senders = []
    for message in all_messages:
        if message.sent_by not in unique_senders:
            if message.sent_by != request.user:
                unique_senders.append(message.sent_by)
        if message.received_by not in unique_senders:
            if message.received_by != request.user:
                unique_senders.append(message.received_by)
        # message.unread = False
        # print(message.unread)
        Inboxfull.objects.filter(user=request.user).delete()
    context = {
        "unique_senders":unique_senders,  # includes request.user 
        "all_messages":all_messages,

    }
    return render(request, "messaging/messages.html", context)


# https://www.youtube.com/watch?v=RVH05S1qab8



class createMessageView(LoginRequiredMixin, CreateView):
    model = Message
    fields = ["received_by", "message_text"]
    context_object_name = "message"
    # sent_by and createdDate

    def form_valid(self, form):
        form.instance.sent_by = self.request.user
        receiver = form.instance.received_by
        Inboxfull.objects.get_or_create(user=receiver)
        return super().form_valid(form)

