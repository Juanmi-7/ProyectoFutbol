package es.iesrafaelalberti.daw.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iesrafaelalberti.daw.modelo.Usuario;
import es.iesrafaelalberti.daw.repositorio.UsuarioRepositorio;

@RestController
public class UsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	
	@PostMapping("/ServletCargarUsuarios")
	public ResponseEntity<Object> cargarUsuarios() {
		return new ResponseEntity<> (usuarioRepositorio.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/ServletBuscarUsuario")
	public ResponseEntity<Object> buscarUsuario(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave) {
		Usuario usuario_buscado = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
		return new ResponseEntity<> (usuario_buscado, HttpStatus.OK);
	}
	
	@PostMapping("/ServletActualizarUsuario")
	public ResponseEntity<Object> actualizarUsuario(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave) {
		Usuario usuario_actualizado = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
		usuario_actualizado.setClave(clave);
		usuarioRepositorio.save(usuario_actualizado);
		return new ResponseEntity<> (usuario_actualizado, HttpStatus.OK);
	}
	
	@PostMapping("/ServletRegistrarUsuario")
	public ResponseEntity<Object> registrarUsuario(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave,
			@RequestParam("status") String status) {
		Usuario usuario_registrado = new Usuario(nombreUsuario, clave, status);
		usuarioRepositorio.save(usuario_registrado);
		return new ResponseEntity<> (usuario_registrado, HttpStatus.CREATED);
	}
	
	@PostMapping("/ServletEliminarUsuario")
	public ResponseEntity<Object> eliminarUsuario(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave) {
		Usuario usuario_eliminado = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
		usuarioRepositorio.delete(usuario_eliminado);
		return new ResponseEntity<> (usuario_eliminado, HttpStatus.OK);
	}

}
