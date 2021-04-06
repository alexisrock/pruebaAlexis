$(document).ready(function () {
	VerUsuarios();
});

function VerUsuarios() {


	$.ajax({
		url: '/Usuario/GetUsuarios',
		type: 'post',
		success: function (result) {
			var tabla = "";
			$('#tblUsuario').DataTable().destroy();
			$('#tblUsuario').find('tbody').empty();
			for (var i = 0; i < result.length; i++) {
				tabla += "<tr>";
				tabla += "<td><img src='" + result[i].url + "' height='70'  class='img-fluid;'  /></td>";
				tabla += "<td>" + result[i].documento + "</td>";
				tabla += "<td>" + result[i].nombres + "</td>";
				tabla += "<td>" + result[i].apellidos + "</td>";
				tabla += "<td>" + result[i].telefono + "</td>";
				tabla += "<td>" + result[i].direccion + "</td>";
				tabla += "<td>" + result[i].fechaNacimineto + "</td>";
				tabla += "<td style='width: 16rem;'>";
				tabla += "<button type='button' class='btn btn-success'  onclick='EditarUsuario(" + result[i].id + ")' >Editar</button>&nbsp;&nbsp;";
				tabla += "<button type='button' class='btn btn-danger' onclick='EliminarUsuario(" + result[i].id + ")' >Eliminar</button>";
				tabla += "</td>";


				tabla += "</tr>";
			}

			$('#tblUsuario').find('tbody').append(tabla);


		}

	})
}



function VerUsuario() {

	if ($('#txtdocumento').val() != "") {
		$('#tblUsuario').DataTable().destroy();
		$.ajax({
			url: '/Usuario/GetUsuarioDocument',
			data: {
				documento: $('#txtdocumento').val()
			},
			type: 'post',
			success: function (result) {
				var tabla = "";
				console.log("resultado "+result)
				$('#tblUsuario').find('tbody').empty();
				if (result != "" || result != "0" ) {
									
					for (var i = 0; i < result.length; i++) {
						tabla += "<tr>";
						tabla += "<td><img src='" + result[i].url + "' height='70'  class='img-fluid;'  /></td>";
						tabla += "<td>" + result[i].documento + "</td>";
						tabla += "<td>" + result[i].nombres + "</td>";
						tabla += "<td>" + result[i].apellidos + "</td>";
						tabla += "<td>" + result[i].telefono + "</td>";
						tabla += "<td>" + result[i].direccion + "</td>";
						tabla += "<td>" + result[i].fechaNacimineto + "</td>";
						tabla += "<td style='width: 16rem;'>";
						tabla += "<button type='button' class='btn btn-success'  onclick='EditarUsuario(" + result[i].id + ")' >Editar</button>&nbsp;&nbsp;";
						tabla += "<button type='button' class='btn btn-danger' onclick='EliminarUsuario(" + result[i].id + ")' >Eliminar</button>";
						tabla += "</td>";


						tabla += "</tr>";
					}

				} else {
					console.log("entro no :(")
					tabla += "<tr><td style='width: 50%;'>";
					tabla += "No se puede encontrar ningun usuario con el documento registrado";					
					tabla += "</td></tr>";
				}

				$('#tblUsuario').find('tbody').append(tabla);

			}

		})
	} else {
		location.reload();
	}

	
}

function EliminarUsuario(id) {

	$.ajax({
		url: '/Usuario/EliminarUsuario',
		data: {
			id: id
		},
		type: 'post',
		success: function () {
			VerUsuarios();
			var mensaje = "";
			mensaje += '<div class="alert alert-success" role="alert">';
			mensaje += 'Usuario eliminado';
			mensaje += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
			mensaje += '<span aria-hidden="true">&times;</span>';
			mensaje += '</button >';
			mensaje += '</div >';

			$('#mensaje').html(mensaje);
		}
	});

}

function EditarUsuario(id) {
	$.ajax({
		url: '/Usuario/GetUsuario',
		data: {
			id: id
		},
		type: 'post',
		success: function (data) {

			$('#editid').val(data[0].id);
			$('#editDocumento').val(data[0].documento);
			$('#editNombre').val(data[0].nombres);
			$('#editApellidos').val(data[0].apellidos);
			$('#editTelefono').val(data[0].telefono);
			$('#editDirecion').val(data[0].direccion);
			$('#editfechanacimiento').val(data[0].fechaNacimineto);
			$('#ModalEditUsuarios').modal('show');
		}


	});
}

function GuardarUsuario() {

	if (ValidaediUser()) {
		var estado;
		if ($("#editestado").is(':checked')) {
			estado = true;
		} else {
			estado = false;
		}
		$.ajax({
			url: '/Usuario/GuardarInfoUsuario',
			data: {
				id: $('#editid').val(),
				documento: $('#editDocumento').val(),
				nombres: $('#editNombre').val(),
				apellidos: $('#editApellidos').val(),
				telefono: $('#editTelefono').val(),
				Direccion: $('#editDirecion').val(),
				fecha: $('#editfechanacimiento').val()
			},
			type: 'post',
			success: function (data) {
				VerUsuarios();
				$('#ModalEditUsuarios').modal('hide');
			}

		});
	}

}

function ValidaediUser() {

	$('#formedit').validate({
		rules: {
			editDocumento: {
				required: true,
				minlength: 3
			},
			editNombre: {
				required: true,
				minlength: 3
			},
			editApellidos: {
				required: true,
				minlength: 3
			},
			editTelefono: {
				required: true,
				minlength: 3
		
			},
			editDirecion: {
				required: true,
				minlength: 3
			},
		},
		messages: {
			editDocumento: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			editNombre: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			editApellidos: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
			editTelefono: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			
			},
			editDirecion: {
				required: "El campo es obligatorio",
				minlength: "El campo debe tener minimo 3 caracteres"
			},
		}
	});
	return true;
}