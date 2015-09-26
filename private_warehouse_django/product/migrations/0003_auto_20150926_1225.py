# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0001_initial'),
        ('product', '0002_auto_20150926_1212'),
    ]

    operations = [
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductSupplierMap',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('barcode', models.CharField(max_length=13)),
                ('article_number', models.CharField(max_length=20)),
                ('current_price', models.ForeignKey(to='product.Price')),
                ('product', models.ForeignKey(to='product.models.Item')),
                ('supplier', models.ForeignKey(to='supplier.Supplier')),
            ],
        ),
        migrations.AddField(
            model_name='price',
            name='product_supplier',
            field=models.ForeignKey(to='product.models.Product'),
        ),
    ]
