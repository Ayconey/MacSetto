from django.db import models

# Create your models here.
class Product(models.Model):
    Category = models.CharField(max_length=100)
    Name = models.CharField(max_length=250)
    Calories = models.IntegerField(null=True)
    TotalFat = models.IntegerField(null=True)
    SaturatedFat = models.DecimalField(decimal_places=2,max_digits=6,null=True)
    TransFat = models.DecimalField(decimal_places=2,max_digits=6,null=True)
    Carbohydrates = models.IntegerField(null=True)
    Protein = models.IntegerField(null=True)
    Cholesterol = models.IntegerField(null=True)
    Sodium = models.IntegerField(null=True)
    DietaryFiber = models.IntegerField(null=True)
    Sugars = models.IntegerField(null=True)
    # below, daily serves in percentages
    VitADaily = models.IntegerField(null=True)
    VitCDaily = models.IntegerField(null=True)
    CalciumDaily = models.IntegerField(null=True)
    IronDaily = models.IntegerField(null=True)