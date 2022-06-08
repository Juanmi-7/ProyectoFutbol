package es.iesrafaelalberti.daw.seguridad;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import es.iesrafaelalberti.daw.modelo.Usuario;
import es.iesrafaelalberti.daw.repositorio.UsuarioRepositorio;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter {
	
	private UsuarioRepositorio usuarioRepositorio;
	
	//Obtenemos los datos del usuarioRepositorio en una contexto aparte para darles seguridad
	public JWTAuthorizationFilter(ApplicationContext applicationContext) {
        this.usuarioRepositorio = applicationContext.getBean(UsuarioRepositorio.class);
    }
	
	private List<SimpleGrantedAuthority> obtenerAutoridades(List<String> textList) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for( String text: textList ) {
			authorities.add(new SimpleGrantedAuthority(text));
		}
		return authorities;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		
		// TODO Auto-generated method stub
		
		Cookie[] cookies = request.getCookies();
		//System.out.println(cookies);
		String jwtToken = "";
		
		if(cookies==null) {
			SecurityContextHolder.clearContext();
		}
		else {
			for(int i = 0; i < cookies.length; i++){
				if("token".equals(cookies[i].getName()))
					jwtToken=cookies[i].getValue();
            }
			//System.out.println(jwtToken);
			
			try {
				if (jwtToken!=null && jwtToken!="") {
					Claims claims = Jwts.parser().setSigningKey("micodigo".getBytes()).parseClaimsJws(jwtToken).getBody();
					String nombreUsuario = claims.getSubject();
					Usuario usuario = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
						//.orElseThrow(EntityNotFoundException::new);
					setUpSpringAuthentication(usuario);
				}
			} catch (Exception e) {
				SecurityContextHolder.clearContext();
			}
			
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	private void setUpSpringAuthentication(Usuario usuario) {
		
		String status = "ROLE_" + usuario.getStatus().toUpperCase(); 
		List<String> authoritiesText = new ArrayList<>(Arrays.asList(status));
		
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(usuario, null, obtenerAutoridades(authoritiesText));
		SecurityContextHolder.getContext().setAuthentication(auth);
	
	}

}
