const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cliente: {
    id: Number,
    nome: String
  },
  transporte: {
    volumes: {
      volume: {
        servico: String
      }
    }
  },
  itens: {
    item: {
      descricao: String,
      qtde: Number,
      vlr_unit: Number
    }
  },
  parcelas: {
    parcela: {
      vlr: Number
    }
  }

})

export const Orders = mongoose.model('Orders', OrderSchema);