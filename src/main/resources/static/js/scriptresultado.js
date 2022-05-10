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
	let body = $("#tbody");
	
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
					if (usuarios[i].status!="admin") {   //Si el usuario no es admin, desabilitamos el botón de añadir resultado
						$("#btn_anadir").attr("disabled","true");
					}
				}
			}
		},
		error: function() {
			$("#salida").val("Error de comunicación.");
		}
		
	});
	
	let lista_partid = [];   //Lista en la que iremos almacenando los diferentes números de partidos
	
	$.ajax({   //Cargamos los partidos y comprobamos si están todos registrados, para, en caso contrario, registrarlos
			
		type: "POST",
		dataType: "html",
		url: "./ServletCargarPartidos",
		success: function(result) {
			let partidos = JSON.parse(result);
			for (let i=0; i<partidos.length; i++) {   //Comprobamos los datos de los partidos
				let indc = lista_partid.indexOf(partidos[i].numeroPartido);   //Añadimos los números de los partidos que no estén en la lista
				if (indc==-1) {
					lista_partid.push(partidos[i].numeroPartido);
				}
			}
			
			$.ajax({   //Cargamos la convocatoria para comprobar que todos los partidos hasta la fecha han sido registrados
					
				type: "POST",
				dataType: "html",
				url: "./ServletCargarConvocatoria",
				success: function(result) {
					
					let convocatoria = JSON.parse(result);
					for (let k=0; k<convocatoria.length; k++) {   //Comprobamos los datos de las convocatorias
						let indice = lista_partid.indexOf(convocatoria[k].numeroPartido);   //Buscamos el índice de convocatoria[k].numeroPartido en la lista_partid para comprobar que no se repita
						let meses = new Array ("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic");
						let dia = parseInt(convocatoria[k].dia.substr(-2));
						let mes = parseInt(convocatoria[k].dia.slice(5,7))-1; //Le restamos uno al valor del mes, ya que el índice de una lista comienza por cero (el mes cero no existe).
						for (let j=0; j<meses.length; j++) {
							if (mes == meses[j]) {
								mes = j;
							}
						}
						let ano = convocatoria[k].dia.slice(0,4);
						let ult_dia = new Date(ano,mes,dia,22,00);   //Variable que determina la última fecha de partido registrada
						let hoy = new Date();   //Variable que determina la fecha actual
						if (indice==-1 && ult_dia<hoy) {   //Comprobamos que el número de partido no está en la lista y que la fecha actual sea mayor que la fecha del partido
							let numero_partido = convocatoria[k].numeroPartido;
							let jugador = convocatoria[k].jugador;
							$.ajax({
								type: "POST",
								dataType: "html",
								url: "./ServletInsertarPartidos",
								data: $.param({
									numero_partido : numero_partido,
									jugador : jugador,
								}),
								error: function() {
									$("#salida").val("Error de comunicación.");
								}
							});
						}
					}
					
				},
				error: function() {
					$("#salida").val("Error de comunicación.");
				}
				
			});
			
		},
		error: function() {
			$("#salida").val("Error de comunicación.");
		}
				
	});
	
	$.ajax({   //Realizar la tabla
			
		type: "POST",
		dataType: "html",
		url: "./ServletCargarPartidos",
		success: function(result) {
			
			let partidos = JSON.parse(result);
			let lista_partidos = [];   //Lista donde se guardarán todos los números de partidos
			let num_partido = 0;   //Variable que controla cada número de partido
			let equipo_1 = [];   //Lista donde se guardarán los jugadores del primer equipo
			let equipo_2 = [];   //Lista donde se guardarán los jugadores del segundo equipo
			let goles_1 = [];   //Lista donde se guardarán los goles del primer equipo
			let goles_2 = [];   //Lista donde se guardarán los goles del segundo equipo
			let total_goles_1 = 0;   //Goles totales del primer equipo
			let total_goles_2 = 0;   //Goles totales del segundo equipo
			for (let i=0; i<partidos.length; i++) {
				num_partido = partidos[i].numeroPartido;
				if (jQuery.inArray(num_partido, lista_partidos) == -1) {   //Vamos añadiendo los números de partidos a la lista sin que se repitan
					lista_partidos.push(num_partido);
				}
			}
			for (let j=0; j<lista_partidos.length; j++) {   //Recorremos la lista de partidos y comprobamos que coincida el número de partido
				let nueva_opcion = document.createElement("option");
				nueva_opcion.value = j;
				nueva_opcion.innerHTML = lista_partidos[j];
				$("#num_part").prepend(nueva_opcion);
				for (let k=0; k<partidos.length; k++) {
					//Comprobamos si las listas de los equipos no están rellenas, y vamos añadiendo jugadores y sus goles a ellas
					if ((equipo_1.length<5 || equipo_2.length<5) && lista_partidos[j] == partidos[k].numeroPartido) {
						if (equipo_1.length<5) {
							equipo_1.push(partidos[k].jugador);
							goles_1.push(partidos[k].goles);
						} else {
							if (equipo_2.length<5) {
								equipo_2.push(partidos[k].jugador);
								goles_2.push(partidos[k].goles);
							}
						}
					}
					//Si las listas de ambos equipos están rellenas, las mostramos en la tabla
					if (equipo_1.length==5 && equipo_2.length==5) {
						goles_1.forEach(function(a){total_goles_1 += a;});
						goles_2.forEach(function(b){total_goles_2 += b;});
						body.append("<tr class='fila_resultados' style='border-top:3px solid black'><td rowspan='2' style='vertical-align:middle;font-size:30px;border-right: 1pt solid black'>"+lista_partidos[j]+
						"</td>"+"<td style='color:blue;text-align:left;'>Equipo 1<div style='color:black'>"+equipo_1+
						"</div></td><td style='vertical-align:middle;font-size:30px;background-color:grey;color:white;'>"+total_goles_1+"</td></tr>"+
						"<tr></td><td style='color:blue;text-align:left;'>Equipo 2<div style='color:black'>"+equipo_2+
						"</div></td><td style='vertical-align:middle;font-size:30px;background-color:grey;color:white;'>"+total_goles_2+"</td></tr>");
						//Una vez rellenemos la tabla con un resultado, reiniciamos las listas de equipos y sus goles
						equipo_1 = [];
						equipo_2 = [];
						goles_1 = [];
						goles_2 = [];
						total_goles_1 = 0;
						total_goles_2 = 0;
					}
				}
			}
			
		},
		error: function() {
			$("#salida").val("Error de comunicación.");
		}
			
	});
	
	$("#btn_anadir").click(function() {   //Botón para añadir nuevos partidos a la BBDD
		
		$("#ana_part").attr("style","display: auto");
		
	});
	
	$("#aceptar").click(function() {   //Botón para elegir el número de partido
		
		$("#jugadores").remove();   //Eliminamos el contenedor en el caso de que esté ya creado
		$("#ana_part").append("<div id='jugadores'></div>");   //Creamos el div donde se mostrarán los jugadores convocados del partido seleccionado
		let elegido = $('#num_part option:selected').text();   //Capturamos el valor del número de partido seleccionado
		
		$.ajax({   //Cargamos la convocatoria para mostrar los jugadores convocados del partido seleccionado
			
			type: "POST",
			dataType: "html",
			url: "./ServletCargarConvocatoria",
			success: function(result) {
			
				let convocatoria = JSON.parse(result);
				let filas = 0;
				for (let i=0; i<convocatoria.length; i++) {   //Recorremos la convocatoria y mostramos los jugadores convocados del partido seleccionado
					if (convocatoria[i].numeroPartido==elegido) {
						filas+=1;
						$("#jugadores").append("<div id='"+filas+"'><input id='jugad_"+filas+"' type='text' value='"+convocatoria[i].jugador+"' readonly>"+
						"<label for='goles'>Goles:</label><button id='menos_gol_"+filas+"' class='menos'>-</button>"+
						"<input id='goles_"+filas+"' type='number' value=0 readonly>"+
						"<button id='mas_gol_"+filas+"' class='mas'>+</button><label for='asistencias'>Asist:</label>"+
						"<button id='menos_asis_"+filas+"' class='menos'>-</button>"+
						"<input id='asis_"+filas+"' type='number' value=0 readonly>"+
						"<button id='mas_asis_"+filas+"' class='mas'>+</button></div><br>");
					}
				}
				$("#jugadores").append("<button type='button' id='enviar' class='aceptar'><i class='fas fa-check'></i> Enviar resultado</button><br><br>");
				for (let j=1; j<=10; j++) {   //Controlamos los botones que aumentan y disminuyen goles y asistencias
					$('#menos_gol_'+j).click(function() {
						let fila = $(this).parent('div').attr('id');
						let goles = parseInt($('#goles_'+fila).val());
						if (goles<=0) {
							alert("No se pueden a\u00F1adir resultados negativos");
						} else {
							goles -= 1;
							$('#goles_'+fila).val(goles);
						}
					});
					$('#mas_gol_'+j).click(function() {
						let fila = $(this).parent('div').attr('id');
						let goles = parseInt($('#goles_'+fila).val());
						goles += 1;
						$('#goles_'+fila).val(goles);
					});
					$('#menos_asis_'+j).click(function() {
						let fila = $(this).parent('div').attr('id');
						let asist = parseInt($('#asis_'+fila).val());
						if (asist<=0) {
							alert("No se pueden a\u00F1adir resultados negativos");
						} else {
							asist -= 1;
							$('#asis_'+fila).val(asist);
						}
					});
					$("#mas_asis_"+j).click(function() {
						let fila = $(this).parent('div').attr('id');
						let asist = parseInt($('#asis_'+fila).val());
						asist += 1;
						$('#asis_'+fila).val(asist);
					});
				}
				$("#enviar").click(function() {   //Botón para enviar los datos del partido a la BBDD
					let total_goles_1 = 0;   //Variable que controla los goles del primer equipo
					let total_asist_1 = 0;   //Variable que controla las asistencias del primer equipo
					let total_goles_2 = 0;   //Variable que controla los goles del segundo equipo
					let total_asist_2 = 0;   //Variable que controla las asistencias del segundo equipo
					for (let k=1; k<=10; k++) {   //Recorremos todos los datos para comprobar la cantidad de goles y asistencias de cada equipo
						let goles = parseInt($('#goles_'+k).val());
						let asistencias = parseInt($('#asis_'+k).val());
						if (k<=5) {
							total_goles_1 += goles;
							total_asist_1 += asistencias;
						} else {
							total_goles_2 += goles;
							total_asist_2 += asistencias;
						}
					}
					if (total_goles_1<total_asist_1 || total_goles_2<total_asist_2) {
						alert("El n\u00FAmero de goles es menor al de asistencias.");
					} else {
						for (let l=1; l<=10; l++) {   //Recorremos todos los datos y los vamos enviando uno a uno
							let numero_partido = elegido;
							let jugador = $('#jugad_'+l).val();
							//alert(jugador);
							let goles = parseInt($('#goles_'+l).val());
							//alert(goles);
							let asistencias = parseInt($('#asis_'+l).val());
							//alert(asistencias);
							let puntos = goles*2+asistencias*1;
							
							$.ajax({
								type: "POST",
								dataType: "html",
								url: "./ServletActualizarPartidos",
								data: $.param({
									numero_partido : numero_partido,
									jugador : jugador,
									goles : goles,
									asistencias : asistencias
								}),
								error: function() {
									$("#salida").val("Error de comunicación.");
								}
							});
							
							$.ajax({
								type: "POST",
								dataType: "html",
								url: "./ServletActualizarJugadores",
								data: $.param({
									nombre : jugador,
									goles : goles,
									asistencias : asistencias,
									puntos : puntos
								}),
								error: function() {
									$("#salida").val("Error de comunicación.");
								}
							});
							
						}
						alert("Datos enviados correctamente.");
						document.location.reload();
					}
				});
				
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
