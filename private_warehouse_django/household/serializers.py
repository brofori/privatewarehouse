__author__ = 'fritz'
from .models import Household, HouseholdProductMap, HouseholdItemMap
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class HouseholdSerializer(ModelSerializer):
    class Meta:
        model = Household


class HouseholdProductMapSerializer(ModelSerializer):
    name = serializers.CharField(source="product.item.name")
    image_url = serializers.URLField(source="product.item.image_url")
    product_id = serializers.CharField(source="product.id")

    class Meta:
        model = HouseholdProductMap