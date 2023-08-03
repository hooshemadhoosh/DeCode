from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from members.models import Members
from django.conf import settings
from django.core.mail import send_mail



def HelloWorldPage(request):
    return HttpResponse("Bonjour World!")
def Home(request):
    #send_mail("Hello World","this is a test","decodenotifier@gamil.com",["decodenotifier@gamil.com"],fail_silently=False)
    return render(request,'index.html')
def Members(request):
    from members.models import Members
    mymembers = Members.objects.all().values()
    return render(request,'member.html',{'mymembers':mymembers})
def Detail(request,id):
    from members.models import Members
    person =  Members.objects.get(pk=id)
    return render(request,'detail.html',{'person': person})
def Delete(request,id):
    from members.models import Members
    Members.objects.get(pk=id).delete()
    return HttpResponseRedirect("/members")
def AddMember(request):
    from members.models import Members
    if request.method == 'POST':
        _firstname = request.POST.get('firstname')
        _lastname = request.POST.get('lastname')
        _phone = request.POST.get('tel')
        _about = request.POST.get('about')
        member = Members(firstname=_firstname,lastname=_lastname,phone_number=_phone,about=_about)
        member.save()
        return HttpResponseRedirect('/members')
    return render(request,'addmember.html')