from django.db import models
from taggit.managers import TaggableManager

from clarifai.client import ClarifaiApi
from clarifai.client import ApiError
# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey('Category')
    manufacturer = models.ForeignKey('manufacturer.Manufacturer')
    barcode = models.CharField(max_length=100)
    tags = TaggableManager()
    image_url = models.URLField()
    product_link = models.URLField()

    def save(self, *args, **kwargs):
        super(Item, self).save(*args, **kwargs)

        try:
            if getattr(self, 'image_url', True):
                clarifai_api = ClarifaiApi(app_id="QktWAfPJZJS-Ux2w4y9thDnwtPshojLB-Ios8rcy", app_secret="li4IFQ7m1NAV3aOmp9LVPRcefUJjRwAn_BbYdvQF")
                tags = clarifai_api.tag_image_urls(self.image_url)
                tags = tags.get('results')[0].get('result').get('tag').get('classes')
                for tag in tags:
                    try:
                        Tag.objects.get(name=tag.lower())
                        self.tags.add(tag)
                    except Tag.DoesNotExist:
                        pass
        except ApiError:
            print("ApiError")


class Category(models.Model):
    name = models.CharField(max_length=128)


class Product(models.Model):
    item = models.ForeignKey('product.Item')
    supplier = models.ForeignKey('supplier.Supplier')
    article_number = models.CharField(max_length=20)
    current_price = models.ForeignKey('Price', null=True)


class Price(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField()
    product_supplier = models.ForeignKey('product.Product')


class Tag(models.Model):
    name = models.CharField(max_length=128, unique=True)