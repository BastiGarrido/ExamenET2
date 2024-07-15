from django.shortcuts import render, redirect
from .models import *
from .forms import *

# Create your views here.

def inicio(request):
    return render(request, 'OnTour/Inicio.html')

def carritoDeCompra(request):
    return render(request, 'OnTour/CarritoDeCompra.html')

def girasEscolares(request):
    return render(request, 'OnTour/GirasEscolares.html')

def viajes(request):
    return render(request, 'OnTour/Viajes.html')

def registroDeContrato(request):
    if request.method == 'POST':
        form = ContratoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('ReportesMensuales.html') 
    else:
        form = ContratoForm()
    return render(request, 'OnTour/RegistroDeContrato.html', {'form': form})

def reportesMensuales(request):
    contratos = Contrato.objects.all().select_related('pais')
    return render(request, 'OnTour/ReportesMensuales.html', {'contratos': contratos})

def registroDeUsuario(request):
    if request.method == 'POST':
        instituto_form = InstitutoForm(request.POST)
        representante_form = RepresentanteForm(request.POST)
        if instituto_form.is_valid() and representante_form.is_valid():
            instituto = instituto_form.save()
            representante = representante_form.save(commit=False)
            representante.instituto = instituto 
            representante.save()
            return redirect('ReportesMensuales.html') 
    else:
        instituto_form = InstitutoForm()
        representante_form = RepresentanteForm()
    return render(request, 'OnTour/RegistroDeUsuario.html', {'instituto_form': instituto_form, 'representante_form': representante_form})

