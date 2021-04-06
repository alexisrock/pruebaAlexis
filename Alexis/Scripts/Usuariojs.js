function ValidarFormUsuario() {
	$('#formUsuario').validate({
		rules: {
			documento: {
				required: true,
				minlength: 3,
				number: true
			},
			nombres: {
				required: true,
				minlength: 3
			},
			apellidos: {
				required: true,
				minlength: 3
			},
			telefono: {
				required: true,
				minlength: 3
				
			},
			direccion: {
				required: true,
				minlength: 3
			},
			fechaNacimineto: {
				required: true,
				minlength: 3
			},
		},
		messages: {
			documento: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres",
				number: "Este campo debe ser numerico"
			},
			nombres: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			apellidos: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			telefono: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres",
			
			},
			direccion: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			fechaNacimineto: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},


		}



	});
	return true;
}


function EnviarUsuario() {

	$('#mensaje').html('&nbsp;');
	if (ValidarFormUsuario()) {
		$('#btnenviarUsuario').trigger('click');
	}
	else {
		var mensaje = "";
		mensaje += '<div class="alert alert-danger" role="alert">';
		mensaje += 'Faltan datos por llenar';
		mensaje += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
		mensaje += '<span aria-hidden="true">&times;</span>';
		mensaje += '</button >';
		mensaje += '</div >';

		$('#mensaje').html(mensaje);
	}

}



