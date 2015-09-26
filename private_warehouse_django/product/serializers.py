__author__ = 'fritz'

from rest_framework.serializers import ModelSerializer
from .models import Item, Product, Price


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product


class PriceSerializer(ModelSerializer):
    class Meta:
        model = Price