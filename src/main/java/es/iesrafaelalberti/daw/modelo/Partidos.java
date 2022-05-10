package es.iesrafaelalberti.daw.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Partidos {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long numeroPartido;
	private String jugador;
	private int goles = 0;
	private int asistencias = 0;
	
	public Partidos(Long numeroPartido, String jugador) {
		this.numeroPartido = numeroPartido;
		this.jugador = jugador;
	}
	
	public Partidos(Long numeroPartido, String jugador, int goles, int asistencias) {
		this.numeroPartido = numeroPartido;
		this.jugador = jugador;
		this.goles = goles;
		this.asistencias = asistencias;
	}
	
	public Partidos() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getNumeroPartido() {
		return numeroPartido;
	}

	public void setNumeroPartido(Long numeroPartido) {
		this.numeroPartido = numeroPartido;
	}

	public String getJugador() {
		return jugador;
	}

	public void setJugador(String jugador) {
		this.jugador = jugador;
	}

	public int getGoles() {
		return goles;
	}

	public void setGoles(int goles) {
		this.goles = goles;
	}

	public int getAsistencias() {
		return asistencias;
	}

	public void setAsistencias(int asistencias) {
		this.asistencias = asistencias;
	}

	@Override
	public String toString() {
		return "Partidos [id=" + id + ", numeroPartido=" + numeroPartido + ", jugador=" + jugador + ", goles=" + goles
				+ ", asistencias=" + asistencias + "]";
	}

}
