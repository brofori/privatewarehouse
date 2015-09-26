# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0001_initial'),
        ('taggit', '0002_auto_20150616_2121'),
        ('manufacturer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('barcode', models.CharField(max_length=13)),
                ('image_url', models.ImageField(upload_to='')),
                ('category', models.ForeignKey(to='product.Category')),
                ('manufacturer', models.ForeignKey(to='manufacturer.Manufacturer')),
                ('supplier', models.ForeignKey(to='supplier.Supplier')),
                ('tags', taggit.managers.TaggableManager(verbose_name='Tags', help_text='A comma-separated list of tags.', to='taggit.Tag', through='taggit.TaggedItem')),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('article_number', models.CharField(max_length=20)),
                ('current_price', models.ForeignKey(to='product.Price')),
                ('item', models.ForeignKey(to='product.Item')),
                ('supplier', models.ForeignKey(to='supplier.Supplier')),
            ],
        ),
        migrations.AddField(
            model_name='price',
            name='product_supplier',
            field=models.ForeignKey(to='product.Product'),
        ),
    ]
