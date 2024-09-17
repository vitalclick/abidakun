---
layout: Post
title: How to Scrape WooCommerce Products with Python and Handle Pagination
description: In this tutorial, I'll show you how to scrape WooCommerce products from a paginated WooCommerce store using Python.
date: '2024-09-17'
tags:
  - wordpress
images:
  - src: /photos/scrape-woocommerce-products-with-python.jpg
    alt: Scrape WooCommerce Products with Python
---

### Introduction:

Scraping WooCommerce products is a useful task if you need to collect product details such as names, prices, and descriptions from an online store. Whether you want to analyze competitor products, migrate data, or track prices, web scraping can automate these tasks for you.

In this tutorial, I'll show you how to scrape WooCommerce products from a paginated WooCommerce store using Python. We’ll extract data like product name, price, descriptions, and more, and save the results in a CSV file. Let’s dive in!

### Why Python for Web Scraping?:

Python is one of the best languages for web scraping due to its simplicity and the availability of robust libraries like `BeautifulSoup`, `Requests`, and `CSV`. These libraries help make the scraping process straightforward and efficient.

### Use Case Example:

Let’s say you want to scrape the product data from this WooCommerce store:

* Base URL: https://www.truckandplantconnection.co.za/trucks-and-trailers/

* Paginated URLs:
    * First Page: https://www.truckandplantconnection.co.za/trucks-and-trailers/?product-page=1
    * Last Page: https://www.truckandplantconnection.co.za/trucks-and-trailers/?product-page=8

We aim to scrape multiple details from these product pages:

 * Product title
 * Price
 * Short description
 * Full description
 * Image URL

### Prerequisites:

Before starting, ensure you have Python installed. We will also need the following Python packages:

* `requests` to fetch web pages
* `BeautifulSoup` to parse the HTML content
* `csv` to write data to a CSV file

You can install these dependencies with the following command:

```bash showLineNumbers
pip install requests beautifulsoup4
```

### Step-by-Step Implementation:

Python is one of the best languages for web scraping due to its simplicity and the availability of robust libraries like `BeautifulSoup`, `Requests`, and `CSV`. These libraries help make the scraping process straightforward and efficient.

##### 1. Import Necessary Libraries:
We start by importing the libraries that we’ll use to scrape and save the data.

```python showLineNumbers
import requests
from bs4 import BeautifulSoup
import csv
```

##### 2. Define the Pagination Logic:
Next, define the base URL and the range of pages to scrape. For instance, the WooCommerce store we're working with has eight pages.:

```python showLineNumbers
base_url = 'https://www.truckandplantconnection.co.za/trucks-and-trailers/?product-page='
start_page = 1
end_page = 8
```

##### 3. Fetch Product Details from the Product Page:
Each product has a detailed page that contains more information like descriptions. We will create a helper function to extract these details.:

```python showLineNumbers
def get_product_details(product_url):
    response = requests.get(product_url)
    if response.status_code != 200:
        return None, None
    soup = BeautifulSoup
```

```python showLineNumbers
(response.content, 'html.parser')
    short_description = soup.find('div', class_='woocommerce-product-details__short-description')
    description = soup.find('div', class_='woocommerce-Tabs-panel--description')
    short_description_text = short_description.text.strip() if short_description else 'N/A'
    description_text = description.text.strip() if description else 'N/A'
    return short_description_text, description_text
```

This function takes the product page URL and returns both the short and full descriptions.


##### 4. Iterate Through Product Pages:

We’ll now fetch each product's details from every page within the pagination range:

```python showLineNumbers
with open('woocommerce_products.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    
    # Write header row
    writer.writerow(['ID', 'Name', 'Price', 'Short Description', 'Description', 'Image URL'])

    for page in range(start_page, end_page + 1):
        # Construct page URL
        url = f'{base_url}{page}'
        response = requests.get(url)
        if response.status_code != 200:
            break

        # Parse the HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all product elements
        products = soup.find_all('li', class_='product')
        
        # Iterate through each product
        for product in products:
            # Extract product details
            title = product.find('h2', class_='woocommerce-loop-product__title').text.strip()
            price = product.find('span', class_='woocommerce-Price-amount').text.strip() if product.find('span', class_='woocommerce-Price-amount') else 'N/A'
            link = product.find('a', class_='woocommerce-LoopProduct-link')['href']
            image_url = product.find('img', class_='attachment-woocommerce_thumbnail')['src']
            
            # Get detailed product info
            short_description, description = get_product_details(link)
            
            # Write the product data to the CSV file
            writer.writerow(['', title, price, short_description, description, image_url])

print("Scraping completed and data saved to woocommerce_products.csv")

```

##### How It Works

1. **Fetching Data:** For each page in the pagination, we construct the URL and fetch the content using requests.
2. **Parsing HTML:** The BeautifulSoup library is used to parse the HTML content and extract specific elements like the product title, price, image, etc.
3. **Navigating Product Pages:** For each product, we extract the link and make a separate request to the product page to get additional details (like short description and full description).
4. **Saving Data:** Finally, we save all the extracted data into a CSV file using Python’s csv library.



### Conclusion:

Scraping WooCommerce products is a relatively simple task with Python and BeautifulSoup. This technique allows you to collect large datasets automatically, which you can use for data analysis, price monitoring, or migrating data to a different platform..

**Happy Web Scraping!**