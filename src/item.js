const TipoItem = {
    MEDICAMENTO: 'Medicamento',
    ALIMENTOPERECEVEL: 'Alimento perecível',
    ALIMENTONAOPERECEVEL:'Alimento não perecível'
};

class Item {
    constructor(nome, doador, validade, tipo) {
        this.nome = nome;
        this.doador = require('./doador'); 
        this.validade = validade;
        this.tipo = TipoItem[tipo-1];

    }

    verificarVencimento() {
        // Lógica para verificar vencimento
    }
}

module.exports = Item;
