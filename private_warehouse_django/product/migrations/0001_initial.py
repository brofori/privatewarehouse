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
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=100)),
                ('image_url', models.ImageField(upload_to='')),
                ('expiration_date', models.DateTimeField()),
                ('storage_location', models.TextField()),
                ('manufacturer', models.ForeignKey(to='manufacturer.Manufacturer')),
                ('supplier', models.ForeignKey(to='supplier.Supplier')),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', to='taggit.Tag', verbose_name='Tags', through='taggit.TaggedItem')),
            ],
        ),
    ]
