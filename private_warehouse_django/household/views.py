from django.shortcuts import render
from .models import Household
from .serializers import HouseholdSerializer, HouseholdProductMapSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from product.models import Item, Product
from .models import HouseholdProductMap, HouseholdItemMap
from django.db.models import Count
from product.serializers import ItemSerializer, ProductSerializer
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
            h = HouseholdProductMap.objects.filter(product=product, household=household)[0]
            h.state = 1
            h.save()
        return Response(status=HTTP_200_OK)

    @detail_route(methods=['post'])
    def add_item(self, request, pk=None):

        if request.data.get('id', None) and request.data.get('min_quantity', None):
            try:
                item = Item.objects.get(pk=request.data.get('id', None))
                household = Household.objects.get(pk=pk)
            except Item.DoesNotExist:
                return Response(status=HTTP_404_NOT_FOUND)
            HouseholdItemMap.objects.create(household=household,
                                            item=item,
                                            min_quantity=request.data.get('min_quantity', None))
        return Response(status=HTTP_200_OK)

    @detail_route(methods=['post'])
    def remove_item(self, request, pk=None):

        if request.data.get('id', None):
            try:
                item = Item.objects.get(pk=request.data.get('id', None))
                household = Household.objects.get(pk=pk)
            except Item.DoesNotExist:
                return Response(status=HTTP_404_NOT_FOUND)
            HouseholdItemMap.get(household=household,
                                 item=item,
                                 min_quantity=request.data.get('min_quantity', None)).delete()
        return Response(status=HTTP_200_OK)

    @detail_route()
    def shoppinglist(self, request, pk=None):
        household = Household.objects.get(pk=pk)
        queryset = HouseholdProductMap.objects.filter(household=household)
        queryset.annotate(Count('product__item'))
        queryset.distinct('product__item')
        queryset = Item.objects.all()
        s = ItemSerializer(queryset, many=True)
        return Response(s.data, status=HTTP_200_OK)

    @detail_route()
    def instock(self, request, pk=None):
        s = HouseholdProductMapSerializer(HouseholdProductMap.objects.filter(state=2), many=True)
        return Response(s.data, HTTP_200_OK)

    @detail_route()
    def history(self, request, pk=None):
        s = HouseholdProductMapSerializer(HouseholdProductMap.objects.all(), many=True)
        return Response(s.data, HTTP_200_OK)







