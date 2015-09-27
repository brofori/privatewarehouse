from django.shortcuts import render
from .models import Household
from .serializers import HouseholdSerializer, HouseholdProductMapSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_201_CREATED
from product.models import Item, Product
from .models import HouseholdProductMap, HouseholdItemMap
from django.db.models import Count
from product.serializers import ItemSerializer, ProductSerializer
# Create your views here.


class HouseholdViewSet(ModelViewSet):
    serializer_class = HouseholdSerializer
    queryset = Household.objects.all()

    @detail_route(methods=['post'])
    def add_product(self, request, pk=None):
        if request.data.get('id', None):
            id = request.data.get('id', None)
            try:
                product = Product.objects.get(id=id)
                household = Household.objects.get(pk=pk)
                HouseholdProductMap.objects.create(product=product, household=household)
            except Product.DoesNotExist:
                pass
            except Household.DoesNotExist:
                pass


        return Response(status=HTTP_200_OK)

    @detail_route(methods=['post'])
    def remove_product(self, request, pk=None):

        if request.data.get('id', None):

            id = request.data.get('id', None)
            product = Product.objects.get(id=id)
            household = Household.objects.get(pk=pk)
            h = HouseholdProductMap.objects.filter(state=2).filter(product=product, household=household)[0]
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
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_200_OK)

    @detail_route(methods=['post'])
    def remove_item(self, request, pk=None):
        if request.data.get('id', None):
            try:
                item = Item.objects.get(pk=request.data.get('id', None))
                household = Household.objects.get(pk=pk)
                HouseholdItemMap.objects.get(household=household, item=item).delete()
            except Item.DoesNotExist:
                return Response(status=HTTP_404_NOT_FOUND)
            except Household.DoesNotExist:
                return Response(status=HTTP_404_NOT_FOUND)
            except HouseholdItemMap.DoesNotExist:
                return Response(status=HTTP_404_NOT_FOUND)
        return Response(status=HTTP_200_OK)

    @detail_route()
    def shoppinglist(self, request, pk=None):
        household = Household.objects.get(pk=pk)
        queryset = HouseholdProductMap.objects.filter(household=household).filter(state=1)

        items = []
        for entry in queryset:
            if entry.product.item not in items:
                items.append(entry.product.item)
        items_to_order = []
        for item in items:
            min_quantity = HouseholdItemMap(household=household, item=item).min_quantity
            if min_quantity > len(HouseholdProductMap.objects.filter(product__item=item)):
                items_to_order.append(item)
        #queryset = Item.objects.all()
        s = ItemSerializer(items_to_order, many=True)
        return Response(s.data, status=HTTP_200_OK)

    @detail_route()
    def instock(self, request, pk=None):
        s = HouseholdProductMapSerializer(HouseholdProductMap.objects.filter(state=2), many=True)
        return Response(s.data, HTTP_200_OK)

    @detail_route()
    def history(self, request, pk=None):
        s = HouseholdProductMapSerializer(HouseholdProductMap.objects.all(), many=True)
        return Response(s.data, HTTP_200_OK)







