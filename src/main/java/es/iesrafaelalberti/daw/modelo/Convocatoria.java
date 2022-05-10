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
public class Convocatoria {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long numeroPartido;
	private String jugador;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+2")
	private Date dia;
		
	public Convocatoria(Long numeroPartido, String jugador, Date dia) {
		this.numeroPartido = numeroPartido;
		this.jugador = jugador;
		this.dia = dia;
	}
		
	public Convocatoria() {
			
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

	public Date getDia() {
		return dia;
	}

	public void setDia(Date dia) {
		this.dia = dia;
	}

	@Override
	public String toString() {
		return "Convocatoria [id=" + id + ", numeroPartido=" + numeroPartido + ", jugador=" + jugador + ", dia=" + dia
				+ "]";
	}

}
