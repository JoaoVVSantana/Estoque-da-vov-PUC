class Alerta {
    constructor(conteudo, motivo, data) {
        this.conteudo = conteudo;
        this.motivo = motivo;
        this.data = data;
    }

    disparar() {
        // Lógica para disparar o alerta
    }
}

module.exports = Alerta;
