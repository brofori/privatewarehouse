__author__ = 'fritz'
from .models import Household
from rest_framework.serializers import ModelSerializer


class HouseholdSerializer(ModelSerializer):
    class Meta:
        model = Household

