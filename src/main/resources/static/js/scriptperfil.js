/**
 * 
 */

$( document ).ready(function() {
	
	let nombre_usuario = location.href.split("=")[1];
	if (nombre_usuario=="" || nombre_usuario==null) {
		$("#estadisticas").attr("disabled","true");
		$("#convocatoria").attr("disabled","true");
		$("#resultado").attr("disabled","true");
	}
	$("#nombre_usuar").html(nombre_usuario);
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
				$("#salida").val("Error de comunicación.");
			}
			
		});
	
	$("#actualizar").click(function() {
		
		let nombre_usuario = $("#nombre_usuario").val();
		let clave = $("#clave").val();
		
		$.ajax({
			type: "POST",
			dataType: "html",
			url: "./ServletActualizarUsuario",
			data: $.param({
				nombre_usuario : nombre_usuario,
				clave : clave
			}),
			success: function(result) {
				alert("Usuario actualizado.");
				$("#salida").text("Usuario actualizado correctamente. ");
				let clave = $("#clave").val("");
			},
			error: function() {
				$("#salida").val("Error de comunicación.");
			}
		});
		
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
				if (result=="ok") {
					$.ajax({
						type: "POST",
						dataType: "html",
						url: "./ServletEliminarUsuario",
						data: $.param({
							nombre_usuario : nombre_usuario,
							clave : clave,
						}),
						success: function(result) {
							alert("Usuario eliminado.");
							$("#salida").text(result);
							$("#nombre_usuar").html("");
							var nombre_usuario = $("#nombre_usuario").val("");
							var clave = $("#clave").val("");
							document.location.href="index.html";
						},
						error: function() {
							alert("Datos incorrectos.");
							$("#salida").val("Error de comunicación.");
						}
						
					});
				} else {
					alert("Datos incorrectos.");
				}
			},
			error: function() {
				$("#salida").val("Error de comunicación.");
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
