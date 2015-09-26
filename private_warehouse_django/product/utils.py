__author__ = 'kwame'
import requests
from bs4 import BeautifulSoup
from .models import Item
from supplier.models import Supplier


def seed_tag_list():
    requests.get()


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
                #detail = p_soup.find_all("div", class_="")

                name = d_soup.find("h1").text
                category = d_soup.find("product-info-item").text
                #manufacturer =
                #barcode =
                #supplier = Supplier.objects.first()
                #image_url =




                products.append({"name": product_title, "link": product_link, "details":[]})

            category.get("sub_categories").append({"name": sub_category_title,
                                                   "link": sub_category_link,
                                                   "products": products})

            sub = category.get("sub_categories")
            category.update({"sub_categories": sub})
            category_dict[i] = category


    print(category_dict)
    #Item.objects.create()
