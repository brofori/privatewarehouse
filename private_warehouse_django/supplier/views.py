from django.shortcuts import render
from .models import Supplier
from .serializers import SupplierSerializer
from rest_framework.viewsets import ModelViewSet


class SupplierViewSet(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
# Create your views here.
