from django.db import models

class Members(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    phone_number = models.IntegerField(null=True)
    about = models.TextField(null=True,blank=True,help_text="Input some text about member...")


    def __str__(self):
        return f'{self.firstname} {self.lastname}'
