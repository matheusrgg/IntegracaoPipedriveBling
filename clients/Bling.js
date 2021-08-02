import axios from "axios";
import { Orders } from "../models/order";
require('dotenv').config({ path: 'variables.env' });


export async function buildSavePayloadBling(deals) {
  const pedidosPipedriveWon = deals;
  const orders = [];

  pedidosPipedriveWon.forEach(pedido => {
    orders.push({
      "xml": `<?xml version="1.0" encoding="UTF-8"?>
      <pedido>
        <cliente>
          <id>${pedido.id}</id
          <nome>${pedido.org_name}</nome>
       </cliente> 
       <transporte>
      <volumes>
            <volume>
              <servico>${pedido.title}</servico>
         </volume>
      </volumes>
      </transporte>
      <itens>
         <item>
           <descricao>${pedido.title}</descricao>
          <qtde>${pedido.weighted_value}</qtde>
         <vlr_unit>${pedido.value}</vlr_unit>
        </item>
      </itens>
      <parcelas>
         <parcela>
             <vlr>${pedido.files_count}</vlr>
         </parcela>
      </parcelas>
      </pedido>`
    })
    await Orders.create({
      "cliente": {
        "id": pedido.id,
        "nome": pedido.org_name
      },
      "transporte": {
        "volumes": {
          "volume": {
            "servico": pedido.title
          }
        }
      },
      "itens": {
        "item": {
          "descricao": pedido.title,
          "qtde": pedido.weighted_value,
          "vlr_unit": pedido.value
        }
      },
      "parcelas": {
        "parcela": {
          "vlr": pedido.files_count
        }
      }
    }
    );
  });
  return orders
}

export async function postDealsBling(deal) {
  const payloadOrders = deal;
  const orderBling = await axios.post(
    "https://bling.com.br/Api/v2/pedido/json/?api_token="`${process.env.API_TOKEN_BLING}`,
    payloadOrders
  );
  return orderBling
}

export async function getOrders(response) {
  try {
    let result = await Orders.find();
    return response.status(200).send({ success: true, result: result });
  } catch (err) {
    return response.status(400).send({ success: false, result: err })
  }
}