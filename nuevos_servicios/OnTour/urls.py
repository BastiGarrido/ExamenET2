from django.urls import path
from .views import *

urlpatterns = [
    path('', inicio, name='inicio'),
    path('girasEscolares', girasEscolares, name='girasEscolares'),
    path('registroDeContrato', registroDeContrato, name='registroDeContrato'),
    path('registroDeUsuario', registroDeUsuario, name='registroDeUsuario'),
    path('reportesMensuales', reportesMensuales, name='reportesMensuales'),
    path('viajes', viajes, name='viajes'),
    path('carritoDeCompra', carritoDeCompra, name='carritoDeCompra'),
]


