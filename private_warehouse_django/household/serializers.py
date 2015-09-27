__author__ = 'fritz'
from .models import Household, HouseholdProductMap, HouseholdItemMap
from rest_framework.serializers import ModelSerializer


class HouseholdSerializer(ModelSerializer):
    class Meta:
        model = Household


class HouseholdProductMapSerializer(ModelSerializer):
    class Meta:
        model = HouseholdProductMap