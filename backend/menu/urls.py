from django.urls import path
from .views import ProductsListView,ProductsDetailView,create_set_view
urlpatterns = [
    path('',ProductsListView.as_view()),
    path('<int:pk>/',ProductsDetailView.as_view()),
    path('createSet/',create_set_view,name='create_set')
]