package es.iesrafaelalberti.daw.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iesrafaelalberti.daw.modelo.Jugadores;
import es.iesrafaelalberti.daw.repositorio.JugadoresRepositorio;

@RestController
public class JugadoresControlador {
	
	@Autowired
	private JugadoresRepositorio jugadoresRepositorio;
	
	@PostMapping("/ServletCargarJugadores")
	public ResponseEntity<Object> cargarJugadores() {
		return new ResponseEntity<> (jugadoresRepositorio.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/ServletActualizarJugadores")
	public ResponseEntity<Object> actualizarJugadores(
			@RequestParam("nombre") String nombre,
			@RequestParam("goles") int goles,
			@RequestParam("asistencias") int asistencias,
			@RequestParam("puntos") int puntos) {
		Jugadores jugador_actualizado = jugadoresRepositorio.findByNombre(nombre);
		jugador_actualizado.setGoles(jugador_actualizado.getGoles() + goles);
		jugador_actualizado.setAsistencias(jugador_actualizado.getAsistencias() + asistencias);
		jugador_actualizado.setPuntos(jugador_actualizado.getPuntos() + puntos);
		jugadoresRepositorio.save(jugador_actualizado);
		return new ResponseEntity<> (jugador_actualizado, HttpStatus.OK);
	}
	
	@PostMapping("/ServletInsertarJugadores")
	public ResponseEntity<Object> insertarJugadores(
			@RequestParam("nombre") String nombre,
			@RequestParam("fechnac") String fechStr) throws ParseException {
		Date fechnac = new SimpleDateFormat("yyyy-MM-dd").parse(fechStr);
		Jugadores jugador_nuevo = new Jugadores(nombre, fechnac);
		jugadoresRepositorio.save(jugador_nuevo);
		return new ResponseEntity<> (jugador_nuevo, HttpStatus.CREATED);
	}
	
	@PostMapping("/ServletEliminarJugadores")
	public ResponseEntity<Object> eliminarJugadores(
			@RequestParam("nombre") String nombre) {
		Jugadores jugador_eliminado = jugadoresRepositorio.findByNombre(nombre);
		jugadoresRepositorio.delete(jugador_eliminado);
		return new ResponseEntity<> (jugador_eliminado, HttpStatus.OK);
	}

}
