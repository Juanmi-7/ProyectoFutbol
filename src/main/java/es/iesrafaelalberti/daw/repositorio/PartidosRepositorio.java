package es.iesrafaelalberti.daw.repositorio;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.iesrafaelalberti.daw.modelo.Partidos;

public interface PartidosRepositorio extends CrudRepository<Partidos, Long> {
	
	public List<Partidos> findByNumeroPartidoAndJugador(Long numeroPartido, String jugador);

}
