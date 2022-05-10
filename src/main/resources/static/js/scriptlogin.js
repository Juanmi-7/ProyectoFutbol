/**
 * 
 */

$( document ).ready(function() {
	
	$("#estadisticas").attr("disabled","true");
	$("#convocatoria").attr("disabled","true");
	$("#resultado").attr("disabled","true");
	
	$("#acceder").click(function() {
		
		let nombre_usuario = $("#nombre_usuario").val();
		let clave = $("#clave").val();
		
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
				if (nombre_usuario==usuario.nombreUsuario && clave==usuario.clave) {
					let nombre_usuario = $("#nombre_usuario").val();
					document.location.href="index.html?usuario="+nombre_usuario;
				} else {
					alert("Usuario no encontrado.");
					let nombre_usuario = $("#nombre_usuario").val("");
					let clave = $("#clave").val("");
				}
			},
			error: function() {
				$("#salida").val("Error de comunicación.");
			}
		});
		
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