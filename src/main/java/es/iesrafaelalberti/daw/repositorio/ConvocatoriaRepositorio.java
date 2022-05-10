package es.iesrafaelalberti.daw.repositorio;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.iesrafaelalberti.daw.modelo.Convocatoria;

public interface ConvocatoriaRepositorio extends CrudRepository<Convocatoria, Long> {
	
	public List<Convocatoria> findByDia(Date dia);
	
}
