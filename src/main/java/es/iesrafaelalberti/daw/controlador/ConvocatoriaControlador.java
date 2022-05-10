package es.iesrafaelalberti.daw.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iesrafaelalberti.daw.modelo.Convocatoria;
import es.iesrafaelalberti.daw.repositorio.ConvocatoriaRepositorio;

@RestController
public class ConvocatoriaControlador {
	
	@Autowired
	private ConvocatoriaRepositorio convocatoriaRepositorio;
	
	@PostMapping("/ServletCargarConvocatoria")
	public ResponseEntity<Object> cargarConvocatoria() {
		return new ResponseEntity<> (convocatoriaRepositorio.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/ServletInsertarConvocatoria")
	public ResponseEntity<Object> insertarConvocatoria(
			@RequestParam("numero_partido") Long numeroPartido,
			@RequestParam("jugador") String jugador,
			@RequestParam("dia") String diaStr) throws ParseException {
		Date fecha = new SimpleDateFormat("yyyy-MM-dd").parse(diaStr);
		Convocatoria convocatoria_nueva = new Convocatoria(numeroPartido, jugador, fecha);
		convocatoriaRepositorio.save(convocatoria_nueva);
		return new ResponseEntity<> (convocatoria_nueva, HttpStatus.CREATED);
	}
	
	@PostMapping("/ServletEliminarConvocatoria")
	public ResponseEntity<Object> eliminarConvocatoria(
			@RequestParam("dia") String diaStr) throws ParseException {
		Date dia = new SimpleDateFormat("yyyy-MM-dd").parse(diaStr);
		List<Convocatoria> convocatoria_eliminada = convocatoriaRepositorio.findByDia(dia);
		convocatoriaRepositorio.deleteAll(convocatoria_eliminada);
		return new ResponseEntity<> ("Partido eliminado"+dia, HttpStatus.OK);
	}

}
