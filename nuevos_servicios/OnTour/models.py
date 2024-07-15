from django.db import models

# Create your models here.

from django.db import models

from django.contrib.auth.models import User

# Modelo Region
class Region(models.Model):
    nombre = models.CharField(max_length=12)
    id_region = models.AutoField(primary_key=True)

    def __str__(self):
        return self.nombre

# Modelo Ciudad
class Ciudad(models.Model):
    nombre = models.CharField(max_length=12)
    id_ciudad = models.AutoField(primary_key=True)

    def __str__(self):
        return self.nombre

# Modelo Comuna
class Comuna(models.Model):
    nombre = models.CharField(max_length=12)
    id_comuna = models.AutoField(primary_key=True)

    def __str__(self):
        return self.nombre

# Modelo Instituto
class Instituto(models.Model):
    NIVEL_ESCOLAR_CHOICES = [
        ('Basica', 'Basica'),
        ('Media', 'Media'),
    ]

    nivel_escolar = models.CharField(max_length=6, choices=NIVEL_ESCOLAR_CHOICES)
    nombre_instituto = models.CharField(max_length=20)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=20)
    correo_electronico = models.EmailField(max_length=15, blank=True)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_instituto

# Modelo Representante
class Representante(models.Model):
    GENERO_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
        ('Otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=25)
    apellido = models.CharField(max_length=20)
    rut = models.CharField(max_length=8)  # El RUT debe contener solo los números
    dv = models.CharField(max_length=1, primary_key=True)  # Dígito verificador (DV) como clave primaria
    correo_electronico = models.EmailField(max_length=15)
    genero = models.CharField(max_length=9, choices=GENERO_CHOICES)
    fecha_nacimiento = models.DateField()

    def __str__(self):
        return f'{self.nombre} {self.apellido}'

    def save(self, *args, **kwargs):
        # Validar que el DV sea un número o 'K'
        if not self.dv.isdigit() and self.dv.upper() != 'K':
            raise ValueError("El dígito verificador (DV) debe ser un número del 0 al 9 o la letra 'K'.")
        super().save(*args, **kwargs)

# Modelo Pais
class Pais(models.Model):
    PAIS_CHOICES = [
        ('Japon', 'Japon'),
        ('España', 'España'),
        ('Corea', 'Corea'),
        ('Mexico', 'Mexico'),
        ('Estados Unidos', 'Estados Unidos'),
        ('Uruguay', 'Uruguay'),
        ('Reino Unido', 'Reino Unido'),
        ('China', 'China'),
        ('Alemania', 'Alemania'),
        ('Paris', 'Paris'),
        ('Chile', 'Chile'),
    ]

    id_pais = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=15, choices=PAIS_CHOICES, unique=True)

    def __str__(self):
        return self.nombre
    
# Modelo Contrato
class Contrato(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    destino = models.ForeignKey('Pais', on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    cantidad_pasajeros = models.PositiveIntegerField()
    monto_contrato = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_cuotas = models.PositiveIntegerField()

    def __str__(self):
        return f'Contrato {self.id_contrato} - {self.destino}'

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.cantidad_pasajeros > 100:
            raise ValidationError('La cantidad de pasajeros no puede superar el número 100.')

        if not (1000000 <= self.monto_contrato <= 4000000):
            raise ValidationError('El monto del contrato debe ser entre 1 millón y 4 millones.')

        if not (5 <= self.cantidad_cuotas <= 15):
            raise ValidationError('La cantidad de cuotas debe ser entre 5 y 15.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(Product, through='CartItem')

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.quantity * self.product.price
