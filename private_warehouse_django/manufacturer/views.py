from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Manufacturer
from .serializers import ManufacturerSerializer
# Create your views here.


class ManufacturerViewSet(ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
