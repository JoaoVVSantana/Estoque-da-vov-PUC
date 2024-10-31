class HistoricoAlteracoes {
    constructor() {
        this.alteracoes = []; // Lista de alterações
    }

    registrarAlteracao(alteracao) {
        this.alteracoes.push(alteracao);
    }

    verificarHistorico() {
        // Lógica para verificar histórico
    }
}

module.exports = HistoricoAlteracoes;
