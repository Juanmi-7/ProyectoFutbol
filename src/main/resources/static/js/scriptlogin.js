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
	
	$("#acceder").click(function() {
		
		let nombre_usuario = $("#nombre_usuario").val();
		let clave = $("#clave").val();
		if (clave=="" || clave==null || nombre_usuario=="" || nombre_usuario==null) {
			$("#salida").html("Datos no v\u00E1lidos. <br><br>");
		}
		else {
		
			$.ajax({
				type: "POST",
				dataType: "html",
				url: "./Login",
				data: $.param({
					nombre_usuario: nombre_usuario,
					clave: clave
				}),
				success: function(result) {
					let token_json = JSON.parse(result);
					let cookies = document.cookie.split(";");
					for (let i = 0; i < cookies.length; i++) {
						let cookie = cookies[i];
						let eqPos = cookie.indexOf("=");
						let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
						document.cookie = name + "=;expires=" + new Date().toUTCString();
					}
					let date = new Date();
					date.setDate(date.getDate() + 1);
					let expires = "; expires=" + date.toGMTString();
					document.cookie = "token="+token_json.token + expires;
					document.location.href="index.html";
				},
				error: function() {
					$("#salida").html("Usuario no encontrado. Introduzca los datos correctamente. <br><br>");
					$("#nombre_usuario").val("");
					$("#clave").val("");
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