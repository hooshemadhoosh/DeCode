from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from members.models import Members
from django.conf import settings
from django.core.mail import send_mail
from email.mime.image import MIMEImage

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string



def HelloWorldPage(request):
    return render(request,'order.html')
def Home(request):
    subject = "DeCode teem presents"
    body = render_to_string('home.html')
    recipients = ["decodenotifier@gmail.com","Dahaghaynhmh@gmail.com","Esmailiyan.mahdi@gmail.com"]
    reply_to = ['noreply@test.com']
    msg = EmailMultiAlternatives(
    subject,
    body,
    from_email=settings.EMAIL_HOST_USER,
    to=recipients,
    reply_to=reply_to
    )
    msg.mixed_subtype = 'related'
    msg.content_subtype = 'html'
    file_path = "D:\Projects\Python\DeCode\WebDevelopement\members\static\images\logo\decode logo.png"
    # with open(file_path, 'r') as f:
    #     data = f.read()
    #     img = MIMEImage(data)
    #     img.add_header('Content-ID', '<{name}>'.format(name="decode logo.png"))
    #     img.add_header('Content-Disposition', 'inline', filename="decode logo.png")
    # msg.attach(img)        
    msg.send()
    #send_mail(subject,"this is a test",settings.EMAIL_HOST_USER,["decodenotifier@gmail.com","Dahaghaynhmh@gmail.com","Esmailiyan.mahdi@gmail.com"],fail_silently=False,html_message=body)
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