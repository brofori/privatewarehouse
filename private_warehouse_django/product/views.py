from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Item
from .serializers import ProductSerializer
# Create your views here.


class ProductViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ProductSerializer


