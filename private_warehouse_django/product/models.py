from django.db import models
from taggit.managers import TaggableManager

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey('Category')
    manufacturer = models.ForeignKey('manufacturer.Manufacturer')
    tags = TaggableManager()
    supplier = models.ForeignKey('supplier.Supplier')
    image_url = models.ImageField()
    expiration_date = models.DateTimeField()
    storage_location = models.TextField()
    quantity = models.IntegerField()


class Category(models.Model):
    name = models.CharField(max_length=128)