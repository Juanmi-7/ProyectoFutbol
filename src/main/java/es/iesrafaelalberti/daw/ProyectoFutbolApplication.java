package es.iesrafaelalberti.daw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import es.iesrafaelalberti.daw.seguridad.JWTAuthorizationFilter;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ProyectoFutbolApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoFutbolApplication.class, args);
	}
	
	@EnableWebSecurity
	@Configuration
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.cors().and().csrf().disable()
				.addFilterAfter(new JWTAuthorizationFilter(getApplicationContext()), UsernamePasswordAuthenticationFilter.class)
				.authorizeRequests()
					.antMatchers("/index.html").permitAll()
					.antMatchers("/estadisticas.html").authenticated()
					.antMatchers("/ServletInsertarJugadores").hasRole("ADMIN")
					.antMatchers("/ServletEliminarJugadores").hasRole("ADMIN")
					.antMatchers("/convocatoria.html").authenticated()
					.antMatchers("/resultado.html").authenticated()
					.antMatchers("/ServletActualizarPartidos").hasRole("ADMIN")
					.antMatchers("/login.html").permitAll()
					.antMatchers("/registro.html").permitAll()
					.antMatchers("/perfil.html").authenticated();
		}
		
	}

}
