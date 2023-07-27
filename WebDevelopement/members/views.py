from django.shortcuts import render
from django.http import HttpResponse
from members.models import Members
from django.conf import settings
from django.core.mail import send_mail

mymembers = Members.objects.all().values()

def HelloWorldPage(request):
    return HttpResponse("Bonjour World!")
def Home(request):
    #send_mail("Hello World","this is a test","decodenotifier@gamil.com",["decodenotifier@gamil.com"],fail_silently=False)
    return render(request,'template.html')
def Members(request):
    return render(request,'member.html',{'mymembers':mymembers})
def Detail(request,id):
    from members.models import Members
    person =  Members.objects.get(pk=id)
    return render(request,'detail.html',{'person': person})