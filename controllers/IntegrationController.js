import { selectStatusPipedrive } from "../clients/Pipedrive.js"
import { getOrders, postDealsBling } from "../clients/Bling.js"

async function integrate(request, response) {

  const dealsPipedriveWon = selectStatusPipedrive();
  const returnArrayOrdersXml = buildSavePayloadBling(dealsPipedriveWon);
  postDealsBling(returnArrayOrdersXml);

  try {
    getOrders(response);

  } catch (error) {

    console.log('caindo no catch', error);

  }
};

export default integrate;