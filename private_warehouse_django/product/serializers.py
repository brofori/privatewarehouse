__author__ = 'fritz'
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Item, Product, Price


class ItemSerializer(ModelSerializer):
    #category = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    #manufacturer = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Item


class ProductSerializer(ModelSerializer):
    name = serializers.CharField(source="item.name")
    image_url = serializers.URLField(source="item.image_url")
    
    class Meta:
        model = Product


class PriceSerializer(ModelSerializer):
    class Meta:
        model = Price