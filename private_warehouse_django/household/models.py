from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Household(models.Model):
    users = models.ManyToOneRel(to=User)


class HouseholdProductMap(models.Model):
    household = models.ForeignKey('Household')
    product = models.ForeignKey('product.models.Product')
    expiration_date = models.DateTimeField()
    storage_location = models.TextField()
    payed_price = models.FloatField()
    date_add = models.DateTimeField(auto_now_add=True)