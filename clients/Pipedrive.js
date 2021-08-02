import axios from "axios";
require('dotenv').config({ path: 'variables.env' });

async function getDealsPipedrive() {
  const deals = await axios.get("https://api.pipedrive.com/v1/deals/?api_token="`${process.env.API_TOKEN_PIPEDRIVE}`);
  return deals.data
}

export async function selectStatusPipedrive() {

  const allDeals = await getDealsPipedrive();
  if (allDeals.success == true) {
    const arrayDeals = allDeals.data;
    const dealsStatusWin = arrayDeals.filter(deal => {
      return deal.status === "open";
      // return deal.status === "won";
    })
    return dealsStatusWin
  }

}