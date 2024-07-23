package SyncLab.Entity;

import jakarta.persistence.*;

@Entity
public class Sedi {

    @Id
    @Column(name = "sedi_nome", length = 45)
    private String sediNome;

    @Column(name = "indirizzo", length = 255)
    private String indirizzo;

    public Sedi(){

    }

    public Sedi(String sediNome, String indirizzo) {
        this.sediNome = sediNome;
        this.indirizzo = indirizzo;
    }

    public String getSediNome() {
        return sediNome;
    }

    public void setSediNome(String sediNome) {
        this.sediNome = sediNome;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }
}
