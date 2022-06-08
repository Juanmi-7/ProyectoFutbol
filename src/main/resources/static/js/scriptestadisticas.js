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
	
	let body = $("#tbody");
	let hoy = new Date();
	let prox_dia = new Date();
	for (prox_dia = new Date(); prox_dia >= hoy; prox_dia.setDate(prox_dia.getDate() + 1)) {   //Función que recoge la fecha del próximo partido
	    if (prox_dia.getDay()==2 || prox_dia.getDay()==3) {
	    	//alert(prox_dia);
	    	break;
	    };
	};
	let lista_jugadores = [];   //Lista donde se guardarán todos los jugadores
	
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
						//alert(usuarios[i].status);
						if (usuarios[i].status=="admin") {   //Si el usuario es admin, mostramos los botones para añadir/eliminar jugadores
							$("#ana_eli_jug").attr("style","display: block; text-align: center");
						}
					}
				}
			},
			error: function() {
				$("#salida").html("Error de comunicación. <br><br>");
			}
			
		});
	
	$.ajax({	//Realizar la tabla
	
		type: "POST",
		dataType: "html",
		url: "./ServletCargarJugadores",
		success: function(result) {
			
			let meses = new Array ("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic");
			//$("#entrada").text(meses[hoy.getMonth()] + " " + hoy.getDate() + ", " + hoy.getFullYear());
			let jugadores = JSON.parse(result);
			for (let i=0; i<jugadores.length; i++) {
				body.append("<tr>"+
				"<td data-th='Nombre Jugador:'>"+jugadores[i].nombre+"</td><td data-th='Fecha Nacimiento:'>"+jugadores[i].fechnac+
				"</td><td data-th='Partidos:'>"+jugadores[i].partidos+"</td><td data-th='Goles:'>"+jugadores[i].goles+
				"</td><td data-th='Asistencias:'>"+jugadores[i].asistencias+"</td><td data-th='Puntos:'>"+jugadores[i].puntos+"</td>"
				+"</tr>");
				if (jugadores[i].fechnac!=null && jugadores[i].fechnac==meses[hoy.getMonth()] +
					" " + hoy.getDate() + ", " +jugadores[i].fechnac.substr(0,4)) {
					$("#entrada").text("FELICIDADES " + jugadores[i].nombre + "! Hoy es tu cumple!");
				}
				/*else {
					$("#entrada").text("Pr\u00F3ximo partido el d\u00EDa: " + prox_dia.getDate() +
					" de " + meses[prox_dia.getMonth()] + " de " + prox_dia.getFullYear() + ". ");
				}*/
				lista_jugadores.push(jugadores[i].nombre);
			}
		},
		error: function() {
			$("#salida").html("Error de comunicación. <br><br>");
		}
			
	});
	
	$("#btn_anadir").click(function() {   //Botón para añadir nuevos jugadores a la BBDD
		
		$("#eli_jug").attr("style","display: none");   //Ocultamos el contenedor de eliminar
		$("#ana_jug").attr("style","display: auto");   //Mostramos el contenedor de añadir
		
	});
	
	$("#btn_anad").click(function() {   //Botón para añadir el jugador a la BBDD
		
		let nombre = $("#nombre").val();
		let fechnac = $("#fechnac").val();
		
		$.ajax({
		
			type: "POST",
			dataType: "html",
			url: "./ServletInsertarJugadores",
			data: $.param({
				nombre : nombre,
				fechnac : fechnac
			}),
			success: function() {
				$("#salida").html("Jugador registrado correctamente. <br><br>");
				location.reload();   //Recargamos la página
			},
			error: function() {
				$("#salida").html("Error de comunicación. <br><br>");
			}
			
		});
		
	});
	
	$("#btn_eliminar").click(function() {   //Botón para eliminar jugadores de la BBDD
		
		$("#ana_jug").attr("style","display: none");   //Ocultamos el contenedor de añadir
		$("#eli_jug").attr("style","display: auto");   //Mostramos el contenedor de eliminar
		for (let i=0; i<lista_jugadores.length; i++) {
		
			let nueva_opcion = document.createElement("option");
			nueva_opcion.value = i;
			nueva_opcion.innerHTML = lista_jugadores[i];
			$("#lista_jug").prepend(nueva_opcion);
				
		}
		
	});
	
	$("#btn_elimin").click(function() {   //Botón para eliminar el jugador seleccionado
		
		let opcion = $('#lista_jug option:selected');
		let nombre = opcion.text();
		var confirmac = confirm("\u00BFEst\u00E1 seguro de que quiere eliminar este jugador?");
    	if (confirmac == false) {
        	return;
		} else {
		
			$.ajax({
			
				type: "POST",
				dataType: "html",
				url: "./ServletEliminarJugadores",
				data: $.param({
					nombre : nombre
				}),
				success: function() {
					$("#salida").html("Jugador eliminado correctamente. <br><br>");
					location.reload();   //Recargamos la página
				},
				error: function() {
					$("#salida").html("Error de comunicación. <br><br>");
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
