/**
 * 
 */

$( document ).ready(function() {
	
	if (nombre_usuario=="" || nombre_usuario==null) {
		$("#estadisticas").attr('style', 'display:none');
		$("#convocatoria").attr('style', 'display:none');
		$("#resultado").attr('style', 'display:none');
		$("#perfil").attr('style', 'display:none');
	}
	
	$("#nombre_usuario").val(nombre_usuario);
	
	$.ajax({   //Comprobamos el nombre del usuario y su status
	
			type: "POST",
			dataType: "html",
			url: "./ServletCargarUsuarios",
			data: $.param({
				nombre_usuario: nombre_usuario,
			}),
			success: function(result) {
			
				let usuarios = JSON.parse(result);
				for (let i=0; i<usuarios.length; i++) {
					if (usuarios[i].nombreUsuario==nombre_usuario) {
						$("#nombre_usuar").html(nombre_usuario + " (" + usuarios[i].status + ")");
					}
				}
			},
			error: function() {
				$("#salida").html("Error de comunicación. <br><br>");
			}
			
		});
	
	$("#actualizar").click(function() {
		
		let nombre_usuario = $("#nombre_usuario").val();
		let clave = $("#clave").val();
		if (clave=="" || clave==null || nombre_usuario=="" || nombre_usuario==null) {
			$("#salida").html("Datos no v\u00E1lidos. <br><br>");
		}
		else {
			
			$.ajax({
				type: "POST",
				dataType: "html",
				url: "./ServletActualizarUsuario",
				data: $.param({
					nombre_usuario : nombre_usuario,
					clave : clave
				}),
				success: function() {
					$("#salida").html("Usuario actualizado correctamente. <br><br>");
					$("#clave").val("");
				},
				error: function() {
					$("#salida").html("Error de comunicación. <br><br>");
				}
			});
		}
		
	});
	
	$("#eliminar").click(function() {
		
		var opcion = confirm("\u00BFEst\u00E1 seguro de que quiere eliminar su cuenta?");
    	if (opcion == false) {
        	return;
		} else {
			var nombre_usuario = $("#nombre_usuario").val();
			var clave = $("#clave").val();
			
			$.ajax({
			type: "POST",
			dataType: "html",
			url: "./ServletBuscarUsuario",
			data: $.param({
				nombre_usuario: nombre_usuario,
				clave: clave
			}),
			success: function(result) {
				let usuario = JSON.parse(result);
				if (usuario.nombreUsuario==nombre_usuario) {
					$.ajax({
						type: "POST",
						dataType: "html",
						url: "./ServletEliminarUsuario",
						data: $.param({
							nombre_usuario : nombre_usuario,
							clave : clave,
						}),
						success: function() {
							$("#salida").html("Usuario eliminado. <br><br>");
							$("#nombre_usuar").html("");
							$("#nombre_usuario").val("");
							$("#clave").val("");
							document.location.href="index.html";
						},
						error: function() {
							$("#salida").html("Error de comunicación. <br><br>");
						}
						
					});
				} else {
					$("#salida").html("Datos incorrectos. <br><br>");
				}
			},
			error: function() {
				$("#salida").html("Datos incorrectos. <br><br>");
			}
		});
			
		}
		
	});
	
	$("#login").click(function() {   //Botón para enlazar páginas
		
		document.location.href="login.html";
		
	});
	
	$("#registro").click(function() {   //Botón para enlazar páginas
		
		document.location.href="registro.html";
		
	});
	
	$("#btn_modo_claro").click(function() {   //Botón para cambiar a modo claro
		
		$("#menu_navegacion").removeClass("oscuro");
		$(".navegacion li a").removeClass("oscuro");
		$("footer").removeClass("oscuro");
		$(".pie li a").removeClass("oscuro");
		$(".claro_oscuro").removeClass("oscuro_botones");
		$("button").removeClass("oscuro_botones");
		$("#btn_modo_claro").removeClass("oscuro_btn_claro");
		$("#btn_modo_oscuro").removeClass("oscuro_btn_oscuro");
		$(".tarjeta").removeClass("oscuro");
		$("select").removeClass("oscuro_btn_oscuro");
		$("input").removeClass("oscuro_btn_oscuro");
		$("#jugadores > div").removeClass("oscuro");
		$("th").removeClass("oscuro_tabla_cabecera");
		$("td").removeClass("oscuro_tabla");
		
	});
	
	$("#btn_modo_oscuro").click(function() {   //Botón para cambiar a modo oscuro
		
		$("#menu_navegacion").addClass("oscuro");
		$(".navegacion li a").addClass("oscuro");
		$("footer").addClass("oscuro");
		$(".pie li a").addClass("oscuro");
		$(".claro_oscuro").addClass("oscuro_botones");
		$("button").addClass("oscuro_botones");
		$("#btn_modo_claro").addClass("oscuro_btn_claro");
		$("#btn_modo_oscuro").addClass("oscuro_btn_oscuro");
		$(".tarjeta").addClass("oscuro");
		$("select").addClass("oscuro_btn_oscuro");
		$("input").addClass("oscuro_btn_oscuro");
		$("#jugadores > div").addClass("oscuro");
		$("th").addClass("oscuro_tabla_cabecera");
		$("td").addClass("oscuro_tabla");
		$(".anadir").removeClass("oscuro_botones");
		$(".aceptar").removeClass("oscuro_botones");
		$(".eliminar").removeClass("oscuro_botones");
		
	});
	
})
