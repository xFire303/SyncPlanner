package SyncLab.Entity;

import jakarta.persistence.*;

@Entity
public class password {

    @Id
    @Column(name = "idUtente", length = 4)
    private int idUtente;

    @Column(name = "pass", length = 100)
    private String pass;

    public password(){

    }

    public password(int idUtente, String pass) {
        this.idUtente = idUtente;
        this.pass = pass;
    }

    public int getIdUtente() {
        return idUtente;
    }

    public void setIdUtente(int idUtente) {
        this.idUtente = idUtente;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}
