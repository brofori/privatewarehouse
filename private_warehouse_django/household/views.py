from django.shortcuts import render
from .models import Household
from .serializers import HouseholdSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from product.models import Item, Product
from .models import HouseholdProductMap, HouseholdItemMap
from django.db.models import Count
from product.serializers import ItemSerializer
# Create your views here.


class HouseholdViewSet(ModelViewSet):
    serializer_class = HouseholdSerializer
    queryset = Household.objects.all()



    @detail_route()
    def add_product(self, request, pk=None):
        if request.query_params.get('barcode', None):
            barcode = request.query_params.get('barcode', None)
            item = Item.objects.get(barcode=barcode)
            product = Product.objects.get(item=item)
            household = Household.objects.get(pk=pk)
            HouseholdProductMap.objects.create(product=product, household=household)
        return Response(status=HTTP_200_OK)

    @detail_route()
    def remove_product(self, request, pk=None):
        if request.query_params.get('barcode', None):
            barcode = request.query_params.get('barcode', None)
            item = Item.objects.get(barcode=barcode)
            product = Product.objects.get(item=item)
            household = Household.objects.get(pk=pk)
            HouseholdProductMap.objects.filter(product=product, household=household)[0].delete()
        return Response(status=HTTP_200_OK)


    @detail_route()
    def shoppinglist(self, request, pk=None):
        household = Household.objects.get(pk=pk)
        queryset = HouseholdProductMap.objects.filter(household=household)
        queryset.annotate(Count('product__item'))
        queryset.distinct('product__item')

        print(queryset)
        return Response(status=HTTP_200_OK)



