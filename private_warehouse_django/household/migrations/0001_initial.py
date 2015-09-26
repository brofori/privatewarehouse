# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Household',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HouseholdItemMap',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('min_quantity', models.IntegerField(default=0)),
                ('household', models.ForeignKey(to='household.Household')),
                ('item', models.ForeignKey(to='product.Item')),
            ],
        ),
        migrations.CreateModel(
            name='HouseholdProductMap',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('expiration_date', models.DateTimeField()),
                ('storage_location', models.TextField()),
                ('payed_price', models.FloatField()),
                ('date_add', models.DateTimeField(auto_now_add=True)),
                ('household', models.ForeignKey(to='household.Household')),
                ('product', models.ForeignKey(to='product.Product')),
            ],
        ),
    ]
