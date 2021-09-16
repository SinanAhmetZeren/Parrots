from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BooleanField, DateTimeField, TextField
from django.urls import reverse


class Message(models.Model):
    sent_by = models.ForeignKey(User, related_name='sent_by',on_delete=models.CASCADE)
    received_by = models.ForeignKey(User, related_name='received_by', on_delete=models.CASCADE)
    createdDate = DateTimeField(auto_now_add=True)
    message_text = TextField(max_length=500)
    unread = BooleanField(default=True)

    class Meta:
        ordering = ['-createdDate']

    def __str__(self):
        return f'{self.sent_by},{self.received_by} msg on {self.createdDate}'

    def get_absolute_url(self):
        return reverse('messages')

