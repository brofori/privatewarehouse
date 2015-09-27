__author__ = 'fritz'
from .models import Household, HouseholdProductMap, HouseholdItemMap
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class HouseholdSerializer(ModelSerializer):
    class Meta:
        model = Household


class HouseholdProductMapSerializer(ModelSerializer):
    category = serializers.CharField(source="product.category.name", read_only=True)
    name = serializers.CharField(source="product.item.name", read_only=True)
    image_url = serializers.URLField(source="product.item.image_url", read_only=True)
    product_id = serializers.CharField(source="product.id", read_only=True)

    class Meta:
        model = HouseholdProductMap