function validarRegistroUsuario() {
    // Obtener los valores de los campos del formulario
    const nivelEscolar = document.getElementById("id_nivel_escolar").value;
    const nombreInstituto = document.getElementById("id_nombre_instituto").value;
    const regionInstituto = document.getElementById("id_region_instituto").value;
    const direccionInstituto = document.getElementById("id_direccion_instituto").value;
    const correoInstituto = document.getElementById("id_correo_instituto").value;
    const ciudadInstituto = document.getElementById("id_ciudad_instituto").value;
    const comunaInstituto = document.getElementById("id_comuna_instituto").value;
    const nombreRepresentante = document.getElementById("id_nombre_representante").value;
    const apellidoRepresentante = document.getElementById("id_apellido_representante").value;
    const rutRepresentante = document.getElementById("id_rut_representante").value;
    const dvRepresentante = document.getElementById("id_dv_representante").value;
    const correoRepresentante = document.getElementById("id_correo_representante").value;
    const generoRepresentante = document.getElementById("id_genero_representante").value;
    const fechaNacimiento = document.getElementById("id_fecha_nacimiento").value;

    // Validar nivel escolar
    if (!nivelEscolar) {
        alert("Debe seleccionar un nivel escolar.");
        return false;
    }

    // Validar nombre del instituto
    if (!/^[a-zA-Z\s]{1,25}$/.test(nombreInstituto)) {
        alert("El nombre del instituto solo debe contener letras y un máximo de 25 caracteres.");
        return false;
    }

    // Validar región del instituto
    if (!/^[a-zA-Z\s]{1,25}$/.test(regionInstituto)) {
        alert("La región del instituto solo debe contener letras y un máximo de 25 caracteres.");
        return false;
    }

    // Validar dirección del instituto
    if (!/^[a-zA-Z0-9\s]{1,25}$/.test(direccionInstituto)) {
        alert("La dirección del instituto solo debe contener letras y números, y un máximo de 25 caracteres.");
        return false;
    }

    // Validar correo del instituto
    if (correoInstituto && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/.test(correoInstituto)) {
        alert("El correo del instituto debe ser válido y terminar en .com o .cl.");
        return false;
    }

    // Validar ciudad del instituto
    if (!/^[a-zA-Z\s]{1,25}$/.test(ciudadInstituto)) {
        alert("La ciudad del instituto solo debe contener letras y un máximo de 25 caracteres.");
        return false;
    }

    // Validar comuna del instituto
    if (!/^[a-zA-Z\s]{1,25}$/.test(comunaInstituto)) {
        alert("La comuna del instituto solo debe contener letras y un máximo de 25 caracteres.");
        return false;
    }

    // Validar nombre del representante
    if (!/^[a-zA-Z\s]{1,12}$/.test(nombreRepresentante)) {
        alert("El nombre del representante solo debe contener letras y un máximo de 12 caracteres.");
        return false;
    }

    // Validar apellido del representante
    if (!/^[a-zA-Z\s]{1,12}$/.test(apellidoRepresentante)) {
        alert("El apellido del representante solo debe contener letras y un máximo de 12 caracteres.");
        return false;
    }

    // Validar RUT del representante
    if (!/^[0-9]{1,8}$/.test(rutRepresentante)) {
        alert("El RUT del representante solo debe contener números y un máximo de 8 caracteres.");
        return false;
    }

    // Validar DV del representante
    if (!/^[0-9Kk]{1}$/.test(dvRepresentante)) {
        alert("El DV del representante solo debe ser un número o la letra K.");
        return false;
    }

    // Validar correo del representante
    if (correoRepresentante && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/.test(correoRepresentante)) {
        alert("El correo del representante debe ser válido y terminar en .com o .cl.");
        return false;
    }

    // Validar fecha de nacimiento
    if (!fechaNacimiento) {
        alert("Debe ingresar una fecha de nacimiento.");
        return false;
    }

    return true;
}

function validarFormulario() {
    const destino = document.getElementById('destino').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const montoContrato = document.getElementById('montoContrato').value;
    const cantidadCuotas = document.getElementById('cantidadCuotas').value;

    const hoy = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const mesHoy = hoy.getMonth() + 1;
    const anioHoy = hoy.getFullYear();
    const mesInicio = fechaInicioDate.getMonth() + 1;
    const anioInicio = fechaInicioDate.getFullYear();

    // Validar destino
    if (!destino) {
        alert('Debe seleccionar un destino.');
        return false;
    }

    // Validar fecha de inicio
    if (!fechaInicio) {
        alert('Debe seleccionar una fecha de inicio.');
        return false;
    }
    if (fechaInicioDate <= hoy) {
        alert('La fecha de inicio no puede ser hoy o una fecha pasada.');
        return false;
    }

    // Validar fecha de fin
    if (!fechaFin) {
        alert('Debe seleccionar una fecha de fin.');
        return false;
    }
    if (anioInicio === anioHoy && (fechaFinDate > new Date(anioHoy, mesHoy + 1, 0))) {
        alert('La fecha de fin no puede superar el mes siguiente de la fecha de inicio.');
        return false;
    }

    // Validar monto del contrato
    if (!montoContrato || montoContrato < 1000000 || montoContrato > 4000000) {
        alert('El monto del contrato debe ser entre 1 millón y 4 millones.');
        return false;
    }

    // Validar cantidad de cuotas
    if (!cantidadCuotas || cantidadCuotas < 5 || cantidadCuotas > 15) {
        alert('La cantidad de cuotas debe ser entre 5 y 15.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            let productId = this.dataset.productId;
            fetch(`/add-to-cart/${productId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update cart UI
                }
            });
        });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

$(document).ready(function() {
    $('.boton').on('click', function(event) {
        event.preventDefault();
        let productId = $(this).data('product-id');
        $.ajax({
            url: `/add-to-cart-ajax/${productId}/`,
            type: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            success: function(response) {
                if (response.success) {
                    alert('Producto añadido al carrito');
                    // Aquí puedes actualizar la UI del carrito, si es necesario
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

$(document).ready(function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    $('.add-to-cart').on('click', function(event) {
        event.preventDefault();
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price'));

        carrito.push({ name: productName, price: productPrice });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
    });
});

$(document).ready(function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    $('.add-to-cart').on('click', function(event) {
        event.preventDefault();
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price'));

        carrito.push({ name: productName, price: productPrice });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
    });
});


$(document).ready(function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const renderCarrito = () => {
        const carritoItems = $('#carrito-items');
        carritoItems.empty();
        let totalPrice = 0;
        carrito.forEach(item => {
            totalPrice += item.price;
            carritoItems.append(`
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} - $${item.price}
                    <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Quitar</button>
                </div>
            `);
        });
        $('#total-price').text(totalPrice);
    };

    renderCarrito();

    $(document).on('click', '.remove-item', function() {
        const name = $(this).data('name');
        const itemIndex = carrito.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            carrito.splice(itemIndex, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Agregar al carrito en GirasEscolares.html
    if (document.querySelectorAll('.add-to-cart').length > 0) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const productName = this.getAttribute('data-name');
                const productPrice = parseFloat(this.getAttribute('data-price'));

                carrito.push({ name: productName, price: productPrice });
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert('Producto añadido al carrito');
            });
        });
    }

    // Mostrar y gestionar el carrito en carritoDeCompra.html
    if (document.getElementById('carrito-items')) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const renderCarrito = () => {
            const carritoItems = document.getElementById('carrito-items');
            carritoItems.innerHTML = '';
            let totalPrice = 0;
            carrito.forEach(item => {
                totalPrice += item.price;
                const itemElement = document.createElement('div');
                itemElement.className = 'list-group-item d-flex justify-content-between align-items-center';
                itemElement.innerHTML = `
                    ${item.name} - $${item.price}
                    <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Quitar</button>
                `;
                carritoItems.appendChild(itemElement);
            });
            document.getElementById('total-price').textContent = totalPrice;
        };

        renderCarrito();

        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-item')) {
                const name = event.target.getAttribute('data-name');
                const itemIndex = carrito.findIndex(item => item.name === name);
                if (itemIndex > -1) {
                    carrito.splice(itemIndex, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    renderCarrito();
                }
            }
        });
    }
});