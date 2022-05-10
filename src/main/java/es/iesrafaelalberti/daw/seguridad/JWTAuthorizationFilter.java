/*package es.iesrafaelalberti.daw.seguridad;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Hibernate;
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
	
	//Obtenemos los datos del usuarioRepositorio aparte para darles seguridad
	public JWTAuthorizationFilter(ApplicationContext applicationContext) {
        this.usuarioRepositorio = applicationContext.getBean(UsuarioRepositorio.class);
    }
	
	protected void simpleDemoFilter(HttpServletRequest request) {
        String encabezado = request.getHeader("Authorization");
        if(encabezado != null && encabezado.equals("OK"))
            simpleSpringAuthentication();
        else
            SecurityContextHolder.clearContext();
    }
	
	private void simpleSpringAuthentication() {
        List<String> authoritiesText = new ArrayList<>(Arrays.asList("STATUS_ADMIN"));
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("lalalala", null, sinLambdas(authoritiesText));
    }
	
	private List<SimpleGrantedAuthority> sinLambdas(List<String> textList) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for( String text: textList ) {
            authorities.add(new SimpleGrantedAuthority(text));
        }
        return authorities;
    }
	
	private List<SimpleGrantedAuthority> conLambdas(List<String> textList) {
        return textList.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		if(request.getHeader("Authorization")!=null) {
            if (!request.getHeader("Authorization").startsWith("Bearer ")) {
                SecurityContextHolder.clearContext();
            } else {
                String jwtToken = request.getHeader("Authorization").replace("Bearer ", "");
                try {
                    Claims claims = Jwts.parser().setSigningKey("pestillo".getBytes()).parseClaimsJws(jwtToken).getBody();
                    String nombreUsuario = claims.getSubject();
                    Usuario usuario = UsuarioRepositorio.findByNombreUsuario(nombreUsuario)
                            .orElseThrow(EntityNotFoundException::new);
                    if(!usuario.getToken().equals(jwtToken))
                        throw new Exception();
                    //Hibernate.initialize(usuario.getStatus());
                    setUpSpringAuthentication(usuario);
                } catch (Exception e) {
                    SecurityContextHolder.clearContext();
                }
            }
        } else {
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
		
	}
	
	private void setUpSpringAuthentication(Usuario usuario) {

        Hibernate.initialize(usuario.getStatus());
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(usuario, null,
                            usuario.getStatus());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

}
*/