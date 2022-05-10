package es.iesrafaelalberti.daw.repositorio;

import org.springframework.data.repository.CrudRepository;

import es.iesrafaelalberti.daw.modelo.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {
	
	public Usuario findByNombreUsuario(String nombreUsuario);

}
