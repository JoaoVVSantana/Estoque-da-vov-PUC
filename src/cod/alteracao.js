class Alteracao {
    constructor(acaoRealizada, doador, estoque, motivoAlteracao) {
        this.acaoRealizada = acaoRealizada;
        this.doador = require('./doador');
        this.estoque = require('./estoque');
        this.motivoAlteracao = motivoAlteracao;
    }

    registrarAlteracao(historico) {
        historico.registrarAlteracao(this);
    }
}

module.exports = Alteracao;
