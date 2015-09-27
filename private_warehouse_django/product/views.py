from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Item, Product, Price
from .serializers import ItemSerializer, ProductSerializer, PriceSerializer
# Create your views here.


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Item.objects.all()
        barcode = self.request.query_params.get('barcode', None)
        print(barcode)
        if barcode is not None:
            queryset = queryset.filter(barcode=barcode)
        return queryset



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PriceViewSet(ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

