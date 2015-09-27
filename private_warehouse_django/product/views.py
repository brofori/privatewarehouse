from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Item, Product, Price
from .serializers import ItemSerializer, ProductSerializer, PriceSerializer
# Create your views here.


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all().exclude(image_url__is_null=True)
    serializer_class = ItemSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Item.objects.all()
        barcode = self.request.query_params.get('barcode', None)
        if barcode is not None:
            queryset = queryset.filter(barcode=barcode)
        return queryset



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Product.objects.all()
        item_id = self.request.query_params.get('item_id', None)
        if item_id is not None:
            queryset = queryset.filter(item__id=item_id)
        return queryset

class PriceViewSet(ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

