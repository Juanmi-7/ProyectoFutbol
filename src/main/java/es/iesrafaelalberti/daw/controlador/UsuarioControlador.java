package es.iesrafaelalberti.daw.controlador;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iesrafaelalberti.daw.modelo.Usuario;
import es.iesrafaelalberti.daw.repositorio.UsuarioRepositorio;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class UsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	
	@PostMapping("/Login")
	public ResponseEntity<Object> login(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave) {
		String token = null;
		Usuario usuario_buscado = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
		//Comparamos la clave dada por el usuario con la almacenada en la base de datos, y lanzamos un error en caso de que no coincidan
		if(usuario_buscado==null || !new BCryptPasswordEncoder().matches(clave, usuario_buscado.getClave())) {
			throw new EntityNotFoundException(nombreUsuario.toString());
		}
		String secretKey = "micodigo";
		token = Jwts
			.builder()
			.setId("CDGenoves")
			.setSubject(nombreUsuario)
			.claim("authorities", usuario_buscado.getStatus())
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + 6000000))
			.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();
		//Mandamos el token en formato Json
		Map<String, String> respuesta = new HashMap<>();
		respuesta.put("token", token);
		return new ResponseEntity<>(respuesta, HttpStatus.OK);
	}
	
	@PostMapping("/ServletCargarUsuarios")
	public ResponseEntity<Object> cargarUsuarios() {
		return new ResponseEntity<> (usuarioRepositorio.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/ServletBuscarUsuario")
	public ResponseEntity<Object> buscarUsuario(
			@RequestParam("nombre_usuario") String nombreUsuario,
			@RequestParam("clave") String clave) {
		Usuario usuario_buscado = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
		System.out.println(usuario_buscado);
		if(usuario_buscado==null || !new BCryptPasswordEncoder().matches(clave, usuario_buscado.getClave())) {
			throw new EntityNotFoundException(nombreUsuario.toString());
		}
		else {
			return new ResponseEntity<> (usuario_buscado, HttpStatus.OK);
		}
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
		String token = null;
		Usuario usuario_registrado = new Usuario(nombreUsuario, clave, status);
		usuarioRepositorio.save(usuario_registrado);
		String secretKey = "micodigo";
		token = Jwts
			.builder()
			.setId("CDGenoves")
			.setSubject(nombreUsuario)
			.claim("authorities", usuario_registrado.getStatus())
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis() + 6000000))
			.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();
		//Mandamos el token en formato Json
		Map<String, String> respuesta = new HashMap<>();
		respuesta.put("token", token);
		return new ResponseEntity<>(respuesta, HttpStatus.CREATED);
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
