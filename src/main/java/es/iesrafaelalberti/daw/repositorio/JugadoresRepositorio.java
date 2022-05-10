package es.iesrafaelalberti.daw.repositorio;

import org.springframework.data.repository.CrudRepository;

import es.iesrafaelalberti.daw.modelo.Jugadores;

public interface JugadoresRepositorio extends CrudRepository<Jugadores, Long> {
	
	public Jugadores findByNombre(String nombre);

}
