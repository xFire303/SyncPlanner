package SyncLab.Entity;

import jakarta.persistence.*;

@Entity
public class Ruolo {
    @Id
    @Column(name = "admin", length = 4)
    private String ruoloAd;

    @Column(name = "id_ruolo", length = 4)
    private int idRuolo;

    @Column(name = "id_utente", length = 4)
    private int idUtente;

    public Ruolo(){

    }

    public Ruolo(String ruoloAd, int idRuolo, int idUtente) {
        this.ruoloAd = ruoloAd;
        this.idRuolo = idRuolo;
        this.idUtente = idUtente;
    }

    public String getRuoloAd() {
        return ruoloAd;
    }

    public void setRuoloAd(String ruoloAd) {
        this.ruoloAd = ruoloAd;
    }

    public int getIdRuolo() {
        return idRuolo;
    }

    public void setIdRuolo(int idRuolo) {
        this.idRuolo = idRuolo;
    }

    public int getIdUtente() {
        return idUtente;
    }

    public void setIdUtente(int idUtente) {
        this.idUtente = idUtente;
    }
}
