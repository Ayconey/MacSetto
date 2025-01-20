![banner](/screenshots/banner.png "")
# MacSet
App about US Mcdonald's menu using data provided by McDonald's on kaggle, https://www.kaggle.com/datasets/mcdonalds/nutrition-facts
I mainly focused on functionality, not on the look of the site.
Ready to deployment with docker-compose.
# Instalation
1. docker-compose build
2. docker-compose up
3. connect to postgresql database(in my case with dbeaver), default credentials:
```python
DATABASES = {
    "default": {
        "ENGINE": 'django.db.backends.postgresql',
        "NAME": os.environ.get("DB_NAME",'mcSet'),
        "USER": os.environ.get("DB_USER", "mcSet"),
        "PASSWORD": os.environ.get("DB_PASS", "mysecretpassword"),
        "HOST": 'db',
        "PORT": '5432',
    }
}
```
4. copy the file from backend/data/menu.csv and insert it into table menu_product.
# 3 Main Functionalities :hammer:
- Calorie Calculator, you can add your order and page will calculate all the macro and micro nutritions about your meal.
- Menu itself, with all the nutritions and search filter.
- MacSet, set creator, you enter calorie range and app will generate random set (from US McDonald's menu) that satisfy your input.

# Some Examples :hamburger:

## Mac Menu :fork_and_knife:
Menu with category search, and sorting.
![menu1](/screenshots/menu1.png "")
![menu2](/screenshots/menu2.png "")

## Calories Calculator :fries:
Calculating all the nutritions of your order.
![calc1](/screenshots/calc1.png "")
![calc2](/screenshots/calc2.png "")
![calc3](/screenshots/calc3.png "")

## MacSet :bento:
Creating sets based on your choice, you can choose to main dish only from one category with additional sides and something to drink, meal based on your calories range.
![calc3](/screenshots/sets1.png "")
![calc3](/screenshots/sets2.png "")
![calc3](/screenshots/sets3.png "")
![calc3](/screenshots/sets4.png "")

# technologies used
- django
- django rest framework
- react
- react-bootstrap
