from django.db import models
from taggit.managers import TaggableManager

# Create your models here.


class Item(models.Model):
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


class Product(models.Model):
    item = models.ForeignKey('product.models.Item')
    supplier = models.ForeignKey('supplier.Supplier')
    barcode = models.CharField(max_length=13)
    article_number = models.CharField(max_length=20)
    current_price = models.ForeignKey('Price')


class Price(models.Model):
    date = models.DateTimeField()
    product_supplier = models.ForeignKey('product.models.Product')