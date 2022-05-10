package es.iesrafaelalberti.daw.modelo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Jugadores {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+2")
	private Date fechnac;
	private int partidos = 0;
	private int goles = 0;
	private int asistencias = 0;
	private int puntos = 0;
	
	public Jugadores(String nombre, Date fechnac) {
		this.nombre = nombre;
		this.fechnac = fechnac;
	}
	
	public Jugadores(String nombre, Date fechnac, int partidos, int goles, int asistencias, int puntos) {
		this.nombre = nombre;
		this.fechnac = fechnac;
		this.partidos = partidos;
		this.goles = goles;
		this.asistencias = asistencias;
		this.puntos = puntos;
	}
	
	public Jugadores() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFechnac() {
		return fechnac;
	}

	public void setFechnac(Date fechnac) {
		this.fechnac = fechnac;
	}

	public int getPartidos() {
		return partidos;
	}

	public void setPartidos(int partidos) {
		this.partidos = partidos;
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

	public int getPuntos() {
		return puntos;
	}

	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}

	@Override
	public String toString() {
		return "Jugadores [id=" + id + ", nombre=" + nombre + ", fechnac=" + fechnac + ", partidos=" + partidos
				+ ", goles=" + goles + ", asistencias=" + asistencias + ", puntos=" + puntos + "]";
	}

}
