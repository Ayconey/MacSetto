from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
import random


# Create your views here.


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        name = self.request.query_params.get('name')
        sortby = self.request.query_params.get('sortby')
        if category:
            queryset = queryset.filter(Category__istartswith=category)
        if name:
            queryset = queryset.filter(Name__icontains=name)
        if sortby:
            if sortby == 'Cal_desc':
                queryset = queryset.order_by('-Calories')
            if sortby == 'Cal_asc':
                queryset = queryset.order_by('Calories')
            if sortby == 'Sugar_desc':
                queryset = queryset.order_by('-Sugars')
            if sortby == 'Sugar_asc':
                queryset = queryset.order_by('Sugars')
            if sortby == 'Fat_desc':
                queryset = queryset.order_by('-TotalFat')
            if sortby == 'Fat_asc':
                queryset = queryset.order_by('TotalFat')
            if sortby == 'Protein':
                queryset = queryset.order_by('-Protein')
        return queryset


class ProductsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(['POST'])
def create_set_view(request):
    cal_max = int(request.data.get('cal_max', 600))
    cal_min = int(request.data.get('cal_min', 540))
    # protein = int(request.data.get('cal_min', 'None'))
    cat_add = request.data.get('cat_add', 'None')
    cat_drink = request.data.get('cat_drink', 'None')
    cat_main = request.data.get('cat_main', 'Beef & Pork')
    cal_range = cal_max-cal_min
    if cal_max > 35000:
        cal_max = 35000

    if cal_min > 35000:
        cal_min = 35000

    if cal_min < 540:
        cal_min = 540

    if cal_max < cal_min:
        cal_max = cal_min

    serializer = ProductSerializer
    if cat_add != 'None':
        cal_max -= 200
    if cat_drink != 'None':
        cal_max -= 100

    # choosing main dish
    products_main = Product.objects.all().filter(Category=cat_main, Calories__lte=cal_max)
    if not products_main: # no products
        return Response(status=404,data={'message':"Couldn't find products satisfying criteria"})
    main_ids = []
    for i in products_main:
        main_ids.append(i.id)
    random.shuffle(main_ids)
    main = Product.objects.get(pk=main_ids[0])
    cal_max = cal_max - main.Calories

    if cat_add != "None":
        # choosing addons
        cal_max += 200
        products_add = Product.objects.all().filter(Category=cat_add, Calories__lte=int(cal_max))
        add_ids = []
        for i in products_add:
            add_ids.append(i.id)
        add = Product.objects.get(pk=random.choice(add_ids))
        cal_max = cal_max - add.Calories

    if cat_drink != 'None':
        cal_max += 100
        products_drink = Product.objects.all().filter(Category=cat_drink, Calories__lte=int(cal_max))
        drink_ids = []
        for i in products_drink:
            drink_ids.append(i.id)
        drink = Product.objects.get(pk=random.choice(drink_ids))
        cal_max -= drink.Calories

    mac_set = {
        'main': [],
        'add': [],
        'drink': [],
    }
    mac_set['main'].append(serializer(main).data)
    if cat_add != "None":
        mac_set['add'].append(serializer(add).data)
    if cat_drink != 'None':
        mac_set['drink'].append(serializer(drink).data)

    # if there is any more calories left
    while cal_max > cal_range:
        # main
        if main_ids:
            m = Product.objects.get(pk=random.choice(main_ids))
            mac_set['main'].append(serializer(m).data)
            cal_max -= m.Calories
        
        # sides/additions
        if cal_max >= cal_range and cat_add != 'None' and add_ids:
            a = Product.objects.get(pk=random.choice(add_ids))
            mac_set['add'].append(serializer(a).data)
            cal_max -= a.Calories
            
        # to drink
        if cal_max >= cal_range and cat_drink != 'None' and drink_ids:
            d = Product.objects.get(pk=random.choice(drink_ids))
            mac_set['drink'].append(serializer(d).data)
            cal_max -= d.Calories

    return Response(status=status.HTTP_200_OK, data={'set': mac_set})
