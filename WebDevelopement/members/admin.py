from django.contrib import admin
from .models import Members
class MemberAdmin(admin.ModelAdmin):
  list_display = ("id","firstname", "lastname")
admin.site.register(Members,MemberAdmin)