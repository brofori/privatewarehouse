from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Item, Product, Price
from .serializers import ItemSerializer, ProductSerializer, PriceSerializer
# Create your views here.


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PriceViewSet(ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

