package es.iesrafaelalberti.daw.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iesrafaelalberti.daw.modelo.Partidos;
import es.iesrafaelalberti.daw.repositorio.PartidosRepositorio;

@RestController
public class PartidosControlador {
	
	@Autowired
	private PartidosRepositorio partidosRepositorio;
	
	@PostMapping("/ServletCargarPartidos")
	public ResponseEntity<Object> cargarPartidos() {
		return new ResponseEntity<> (partidosRepositorio.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/ServletActualizarPartidos")
	public ResponseEntity<Object> actualizarPartidos(
			@RequestParam("numero_partido") Long numeroPartido,
			@RequestParam("jugador") String jugador,
			@RequestParam("goles") int goles,
			@RequestParam("asistencias") int asistencias) {
		List<Partidos> partido_actualizado = partidosRepositorio.findByNumeroPartidoAndJugador(numeroPartido, jugador);
		partido_actualizado.get(0).setGoles(goles);
		partido_actualizado.get(0).setAsistencias(asistencias);
		partidosRepositorio.save(partido_actualizado.get(0));
		return new ResponseEntity<> (partido_actualizado, HttpStatus.OK);
	}
	
	@PostMapping("/ServletInsertarPartidos")
	public ResponseEntity<Object> insertarPartidos(
			@RequestParam("numero_partido") Long numeroPartido,
			@RequestParam("jugador") String jugador) {
		Partidos partido_nuevo = new Partidos(numeroPartido, jugador);
		partidosRepositorio.save(partido_nuevo);
		return new ResponseEntity<> (partido_nuevo, HttpStatus.CREATED);
	}

}
