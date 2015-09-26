__author__ = 'fritz'

from rest_framework.serializers import ModelSerializer
from .models import Item


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Item
