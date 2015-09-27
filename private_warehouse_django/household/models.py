from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.utils.translation import ugettext as _
STATES = (
    (1, _("used")),
    (2, _("new")),
    (3, _("on the way")),
)


class Household(models.Model):
    user = models.ForeignKey(User)


class HouseholdItemMap(models.Model):
    item = models.ForeignKey('product.Item')
    household = models.ForeignKey('Household')
    min_quantity = models.IntegerField(default=0)


class HouseholdProductMap(models.Model):
    household = models.ForeignKey('Household')
    product = models.ForeignKey('product.Product')
    expiration_date = models.DateTimeField(null=True)
    storage_location = models.TextField()
    payed_price = models.FloatField(null=True)
    date_add = models.DateTimeField(auto_now_add=True)
    state = models.CharField(choices=STATES, default=1, max_length=128)