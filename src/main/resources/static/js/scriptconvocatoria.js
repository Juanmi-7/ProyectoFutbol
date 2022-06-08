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
	
	let lista_convocados = [];   //Lista donde se guardarán los jugadores convocados
	let lista_seleccionados = [];   //Lista donde se guardarán los jugadores seleccionados
	let ya_convocado = 0;   //Variable creada para comprobar si el jugador ya estaba en la lista de convocados
	let numero_partido = 0;
	let ult_fech = "";
	let hoy = new Date();
	let prox_dia = new Date();	//Variable que determina la próxima fecha de partido
	for (prox_dia = new Date(); prox_dia >= hoy; prox_dia.setDate(prox_dia.getDate() + 1)) {   //Comprobamos la fecha del próximo partido
	    if (prox_dia.getDay()==2 || prox_dia.getDay()==3) {
	    	//alert(prox_dia);
	    	break;
	    };
	};
	let meses = new Array ("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic");
	$("#entrada").text("Pr\u00F3ximo partido el d\u00EDa: " + prox_dia.getDate() +
		" de " + meses[prox_dia.getMonth()] + " de " + prox_dia.getFullYear() + ". ");	//Anunciamos la próxima fecha de partido
	
	$.ajax({   //Cargamos la lista de convocados para rellenar el campo
			
			type: "POST",
			dataType: "html",
			url: "./ServletCargarConvocatoria",
			success: function(result) {
			
				let convocatoria = JSON.parse(result);
				for (let i=0; i<convocatoria.length; i++) {   //Obtenemos los datos de última fecha de partido y último número de partido
					ult_fech = convocatoria[i].dia;
					numero_partido = convocatoria[i].numeroPartido;
				}
				
				//Transformamos el formato de la última fecha de partido de la BBDD para poder compararla con la fecha del próximo partido:
				let dia = parseInt(ult_fech.substr(-2));
				let mes = parseInt(ult_fech.slice(5,7))-1; //Le restamos uno al valor del mes, ya que el índice de una lista comienza por cero (el mes cero no existe).
				for (let j=0; j<meses.length; j++) {
					if (mes == meses[j]) {
						mes = j;
					}
				}
				let ano = ult_fech.slice(0,4);
				
				//Variable que determina la última fecha de partido registrada, nos permite el control del número de partido:
				let ult_dia = new Date(ano,mes,dia,22,00);   //Damos por hecho que los partidos se juegan a las 22:00 horas
				//Variable que determina la próxima fecha de partido:
				let prox_fech = new Date(prox_dia.getFullYear(), prox_dia.getMonth(), prox_dia.getDate(), 22, 00);   //Damos por hecho que los partidos se juegan a las 22:00 horas
				
				//Variable que nos permite colocar los jugadores de la lista de convocados en el campo:
				let numero = 1;
				
				//Comprobamos que la última fecha de partido de la BBDD coincide con la fecha del próximo partido y añadimos los jugadores a lista convocados
				for (let i=0; i<convocatoria.length; i++) {
					if (ult_dia>=prox_fech && numero_partido==convocatoria[i].numeroPartido) {
						lista_convocados.push(convocatoria[i].jugador);
					}
				}
				
				//Si la última fecha de partido de la BBDD es anterior a la del próximo y la lista de convocados está vacía, aumentamos en uno el número de partido
				if (ult_dia<=prox_fech) {
					if (lista_convocados.length == 0) {
						numero_partido += 1;
					}
					for (let i=0; i<convocatoria.length; i++) {
						if (numero_partido == convocatoria[i].numeroPartido) {
							$("#"+numero+"").append(convocatoria[i].jugador);
							numero+=1;
						}
					}
				};
				
				//Desabilitamos el botón Añadir si ya tenemos los 10 jugadores convocados:
				if (lista_convocados.length>=10) {
					$("#btn_anadir").prop('disabled', true);
				}
				
				$("#num").append(lista_convocados.length);
				
			},
			error: function() {
				$("#salida").html("Error de comunicación. <br><br>");
			}
		
	});
	
	$.ajax({   //Cargamos la lista de jugadores para rellenar el primer select
		
		type: "POST",
		dataType: "html",
		url: "./ServletCargarJugadores",
		success: function(result) {
			
			let jugadores = JSON.parse(result);
			for (let i=0; i<jugadores.length; i++) {
				
				let indc = lista_convocados.indexOf(jugadores[i].nombre);   //Añadimos los jugadores que no estén ya convocados
				if (indc==-1) {
					let nueva_opcion = document.createElement("option");
					nueva_opcion.value = i;
					nueva_opcion.innerHTML = jugadores[i].nombre;
					$("#convocat").prepend(nueva_opcion);
				}
				
			}
		},
		error: function() {
			$("#salida").html("Error de comunicación. <br><br>");
		}
		
	});
	
	$("#btn_anadir").click(function() {   //Función para añadir los valores del primer select al segundo
		
		let opcion = $('#convocat option:selected');
		
		//Desabilitamos el botón Añadir si ya tenemos los 10 jugadores convocados:
		if (lista_seleccionados.length>=10 || lista_convocados.length+lista_seleccionados.length>=10) {
			$("#btn_anadir").prop('disabled', true);
		} else {   //Si no tenemos aún los 10 jugadores seleccionados, se van añadiendo a la lista
			if (opcion!="" || opcion!=null) {
				opcion.appendTo('#convocados');
			}
			lista_seleccionados.push(opcion.text());
			if (lista_seleccionados.length>=10 || lista_convocados.length+lista_seleccionados.length>=10) {
				$("#btn_anadir").prop('disabled', true);
			}
		}
		
	});
	
	/*$("#btn_quitar").click(function() {   //Función para pasar los valores del segundo select al primero
		
		let opcion = $('#convocados option:selected');
		
		//Desabilitamos el botón Quitar si no hay jugadores convocados:
		if (lista_seleccionados.length=0) {
			$("#btn_quitar").prop('disabled', true);
		} else {   //Si tenemos jugadores seleccionados, se van quitando de la lista
			if (opcion!="" || opcion!=null) {
				opcion.appendTo('#convocat');
			}
			lista_seleccionados.push(opcion.text());
			if (lista_seleccionados.length>=10 || lista_convocados.length+lista_seleccionados.length>=10) {
				$("#btn_anadir").prop('disabled', true);
			}
		}
		
	});*/
	
	$('#enviar').click(function() {   //Función para enviar la lista de jugadores seleccionados
		
		let jugador = "";
		let mes = prox_dia.getMonth()+1;
		fecha = ""+prox_dia.getFullYear()+"-0"+mes+"-"+prox_dia.getDate()+"";
		if (lista_convocados.length<10) {
		
			for (let i=0; i<lista_seleccionados.length; i++) {
			
				jugador=lista_seleccionados[i];
				let indice = lista_convocados.indexOf(jugador);   //Comprobamos que los jugadores seleccionados no estén anteriormente convocados
				//alert(indice);
				if (indice==-1) {
		
			 		$.ajax({   //Insertamos a la convocatoria los jugadores seleccionados
						
						type: "POST",
						dataType: "html",
						url: "./ServletInsertarConvocatoria",
						data: $.param({
							numero_partido : numero_partido,
							jugador : jugador,
							dia : fecha
						}),
						success: function() {
							$("#salida").html("Convocatoria enviada. <br><br>");
						},
						error: function() {
							$("#salida").html("Error de comunicación. <br><br>");
						}
					
					});
					
				} else {
					ya_convocado = 1;
				}
				
			}
			
		}
		
		//alert(lista_seleccionados);
		//alert(ya_convocado);
		if (ya_convocado == 1) {
			$("#salida").html("Alg\u00FAn jugador de los seleccionados ya estaba convocado anteriorente. <br><br>");
		}
		$("#salida").html("Convocatoria enviada. <br><br>");
		location.reload();   //Recargamos la página
		
	});
	
	$("#eliminar").click(function() {   //Función para eliminar la convocatoria de jugadores seleccionados
		
		let confirmacion = confirm("\u00BFEst\u00E1 seguro de que quiere eliminar la convocatoria?");
    	if (confirmacion == false) {
        	return;
		} else {
		
			let mes = prox_dia.getMonth()+1;
			fecha = ""+prox_dia.getFullYear()+"-"+mes+"-"+prox_dia.getDate()+"";
		
			$.ajax({   //Insertamos a la convocatoria los jugadores seleccionados
				
				type: "POST",
				dataType: "html",
				url: "./ServletEliminarConvocatoria",
				data: $.param({
					dia : fecha
				}),
				success: function() {
					for (let i=0; i<lista_convocados.length; i++) {
						jugador=lista_convocados[i];
						//alert(jugador);
						$("#campo").append("<div>"+jugador+"</div><br>");
					}
				},
				error: function() {
					$("#salida").html("Error de comunicación. <br><br>");
				}
			
			});
			
			$("#salida").html("Convocatoria eliminada. <br><br>");
			location.reload();   //Recargamos la página
			
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
