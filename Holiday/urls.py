
from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('auction.urls')),
    path('social/', include('user.urls')),
    path('chat/', include('chat.urls')),
    path('messages/', include('messaging.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
