"""
URL configuration for WebDevelopement project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from members import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('order/', views.HelloWorldPage ),
    path('', views.Home ),
    path('members/', views.Members ),
    path('members/detail/<int:id>', views.Detail ),
    path('members/delete/<int:id>', views.Delete ),
    path('members/add', views.AddMember ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
