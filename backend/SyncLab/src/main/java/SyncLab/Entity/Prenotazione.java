package SyncLab.Entity;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;


public class Prenotazione {
    @Id
    @Column(name = "prenotazione_id", length = 45)
    private int prenotazioneId;

    @Column(name = "data", length = 5)
    private Date data;

    @Column(name = "utente_id", length = 45)
    private int utenteId;

    @Column(name = "oraIn", length = 4)
    private Time oraIn;

    @Column(name = "oraFin", length = 4)
    private Time oraFin;

    @Column(name = "approva", length = 1)
    private boolean approva;

    public Prenotazione(){

    }

    public Prenotazione(int prenotazioneId, Date data, int utenteId, Time oraIn, Time oraFin, boolean approva) {
        this.prenotazioneId = prenotazioneId;
        this.data = data;
        this.utenteId = utenteId;
        this.oraIn = oraIn;
        this.oraFin = oraFin;
        this.approva = approva;
    }

    public int getPrenotazioneId() {
        return prenotazioneId;
    }

    public void setPrenotazioneId(int prenotazioneId) {
        this.prenotazioneId = prenotazioneId;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public int getUtenteId() {
        return utenteId;
    }

    public void setUtenteId(int utenteId) {
        this.utenteId = utenteId;
    }

    public Time getOraIn() {
        return oraIn;
    }

    public void setOraIn(Time oraIn) {
        this.oraIn = oraIn;
    }

    public Time getOraFin() {
        return oraFin;
    }

    public void setOraFin(Time oraFin) {
        this.oraFin = oraFin;
    }

    public boolean isApprova() {
        return approva;
    }

    public void setApprova(boolean approva) {
        this.approva = approva;
    }
}
