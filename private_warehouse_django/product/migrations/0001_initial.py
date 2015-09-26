# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('expiration_date', models.DateTimeField()),
                ('storage_location', models.TextField()),
                ('tags', taggit.managers.TaggableManager(to='taggit.Tag', help_text='A comma-separated list of tags.', verbose_name='Tags', through='taggit.TaggedItem')),
            ],
        ),
    ]
