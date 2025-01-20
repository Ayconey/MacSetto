from django.test import TestCase
from .models import Product
from django.urls import reverse,resolve

# Create your tests here.

class ProductModelTestCase(TestCase):
    def setUp(self):
        Product.objects.create(
            Category='Smoothies & Shakes',
            Name="McFlurry with Reese's Peanut Butter Cups (Snack)",
            Calories=410,
            TotalFat=16,
            SaturatedFat=8,
            TransFat=0,
            Carbohydrates=57,
            Protein=10,
            Cholesterol=30,
            Sodium=200,
            DietaryFiber=1,
            Sugars=51,
            VitADaily=10,
            VitCDaily=0,
            CalciumDaily=30,
            IronDaily=4,
        )
        self.p1 = Product.objects.all()[0]

    def test_product_created(self):
        self.assertTrue(Product.objects.all())

    def test_product_add(self):
        Calories = 400
        Calories += self.p1.Calories
        self.assertTrue(Calories==810)


class ProductApiTestCase(TestCase):
    def setUp(self) -> None:
        Product.objects.create(
            Category='Breakfast',
            Name="McFlurry with Reese's Peanut Butter Cups (Snack)",
            Calories=410,
            TotalFat=16,
            SaturatedFat=8,
            TransFat=0,
            Carbohydrates=57,
            Protein=10,
            Cholesterol=30,
            Sodium=200,
            DietaryFiber=1,
            Sugars=51,
            VitADaily=10,
            VitCDaily=0,
            CalciumDaily=30,
            IronDaily=4,
        )
        self.p1 = Product.objects.all()[0]

    def test_createSet_api_view(self):
        url = reverse('create_set')
        self.assertEqual(url,'/menu/createSet/')
        response = self.client.post(url,{'cat_main':'Breakfast',
          'cat_add':'None',
          'cat_drink':'None',
          'cal_min':500,
          'cal_max':800},follow=True)
        
        self.assertEqual(response.status_code,200)

    def test_createSet_failed(self):
        url = reverse('create_set')
        response = self.client.post(url, {'cal_min': 500,'cal_max': 800}, follow=True)
        self.assertNotEqual(response.status_code,200)

