from django import forms
from django.forms import ModelForm
from .models import *

class InstitutoForm(forms.ModelForm):
    class Meta:
        model = Instituto
        fields = ['nivel_escolar', 'nombre_instituto', 'region', 'direccion', 
                  'correo_electronico', 'ciudad', 'comuna']

class RepresentanteForm(forms.ModelForm):
    class Meta:
        model = Representante
        fields = ['nombre', 'apellido', 'genero', 
                  'rut', 'dv', 'correo_electronico', 'fecha_nacimiento']
        
class ContratoForm(forms.ModelForm):
    class Meta:
        model = Contrato
        fields = ['destino', 'fecha_inicio', 'fecha_fin', 'cantidad_pasajeros', 'monto_contrato', 'cantidad_cuotas']

