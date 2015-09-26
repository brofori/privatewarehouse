__author__ = 'kwame'
import requests
from bs4 import BeautifulSoup
from .models import Item
from .models import Category
from manufacturer.models import Manufacturer
from django.db import DataError
from .models import Item, Tag
from django.db import IntegrityError
from supplier.models import Supplier


def seed_tag_list():
    abc = "abcdefghijklmnopqrstovwxyz"
    for letter in abc:
        r = requests.get("http://www.bbc.co.uk/food/ingredients/by/letter/{}".format(letter))
        soup = BeautifulSoup(r.text, 'html.parser')
        for li in soup.find_all("li", attrs={"class": "resource"}):
            name = li.a.text.strip().lower()
            try:
                Tag.objects.create(name=name)
            except IntegrityError:
                pass


def seed_items():
    category_dict = []
    url = "http://www.codecheck.info"
    url_ext = "/essen.kat"

    markup = requests.get(url + url_ext).text

    soup = BeautifulSoup(markup, 'html.parser')
    category_list = soup.find_all("div", class_="cell category")

    for category in category_list:
        a_tag = category.find("a")
        category_title = a_tag.get_text()
        category_link = a_tag['href']
        category_dict.append({"name": category_title, "link": category_link, "sub_categories": []})

    for i, category in enumerate(category_dict):
        link = category.get("link")

        category_markup = requests.get(url + link).text
        soup = BeautifulSoup(category_markup, 'html.parser')
        sub_category_list = soup.find_all("div", class_="cell category")

        #
        # SUB CATEGORIES
        #
        for sub_category in sub_category_list:
            if sub_category is None:
                continue

            s_a_tag = sub_category.find("a")

            if s_a_tag is None:
                continue

            sub_category_title = s_a_tag.get_text()
            sub_category_link = s_a_tag['href']

            if sub_category_title is None:
                continue

            #
            #   CREATE CATEGORY IN DATABASE
            #
            Category.objects.create(name=sub_category_title)

            #
            #PRODUCTS
            #
            p_markup = requests.get(url + sub_category_link).text
            p_soup = BeautifulSoup(p_markup, 'html.parser')
            product_list = p_soup.find_all("div", class_="cell products")
            products = []
            for p in product_list:
                if p is None:
                    continue

                p_a_tag = p.find("a")

                if p_a_tag is None:
                    continue

                product_title = p_a_tag.get_text()
                product_link = p_a_tag['href']

                #
                #Product Details
                #
                d_markup = requests.get(url + product_link).text
                d_soup = BeautifulSoup(d_markup, 'html.parser')

                name = d_soup.find("h1").text.strip()
                category_name = sub_category_title
                manufacturer = d_soup.find(text="Hersteller / Vertrieb")

                if manufacturer is None:
                    continue

                manufacturer = manufacturer.find_parent("p").find_next_sibling().text

                barcode = d_soup.find(text="Strichcode-Nummer")

                if barcode is None:
                    continue

                barcode = barcode.find_parent("p").find_next_sibling().text

                #supplier = Supplier.objects.first()

                img = d_soup.find(class_="product-image block")

                if img is None:
                    continue

                img = img.find("img").get('src')
                img = url+img

                products.append({"name": product_title,
                                 "product_link": product_link,
                                 "image_url": img,
                                 "barcode": barcode,
                                 "manufacturer": manufacturer,
                                 "categroy": category_name, })
                #
                #   CREATE MANUFACTURER IN DATABASE
                #
                Manufacturer.objects.create(name=manufacturer)

                #
                #   CREATE ITEM IN DATABASE
                #
                try:
                    Item.objects.create(name=name,
                                        product_link=url+product_link,
                                        image_url=img,
                                        barcode=barcode,
                                        manufacturer=Manufacturer.objects.filter(name=manufacturer)[0],
                                        category=Category.objects.filter(name=category_name)[0])
                except DataError:
                    print("DataError")

            category.get("sub_categories").append({"name": sub_category_title,
                                                   "link": sub_category_link,
                                                   "products": products})

            sub = category.get("sub_categories")
            category.update({"sub_categories": sub})
            category_dict[i] = category


    print("finished data acquisition")
