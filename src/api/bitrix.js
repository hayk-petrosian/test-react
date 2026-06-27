const WEBHOOK =
    "https://b24-whn1gj.bitrix24.ru/rest/1/ga1cyyriofddah3q";

export async function getDeals() {
    const response = await fetch(
        `${WEBHOOK}/crm.deal.list.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                select: ["*", "UF_*"],
            }),
        }
    );

    const data = await response.json();

    return data.result;
}

export async function getDealFields() {
    const response = await fetch(
        `${WEBHOOK}/crm.deal.fields.json`
    );

    const data = await response.json();

    return data.result;
}

export async function reserveApartment(dealId) {
    const response = await fetch(
        `${WEBHOOK}/crm.deal.update.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: dealId,
                fields: {
                    STAGE_ID: "PREPARATION",
                },
            }),
        }
    );

    return await response.json();
}

export async function createDeal(apartment) {
    const dealResponse = await fetch(
        `${WEBHOOK}/crm.deal.add.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields: {
                    TITLE: `Заявка на квартиру №${apartment.id}`,
                    CURRENCY_ID: "RUB",
                    OPPORTUNITY: Number(apartment.price),

                    UF_CRM_1782385645823: apartment.id,
                    UF_CRM_1782385754259: apartment.area,
                    UF_CRM_1782385781764: apartment.price,
                    UF_CRM_1782385816617: apartment.rooms,
                    UF_CRM_1782385835725: apartment.floor,
                },
            }),
        }
    );

    const dealData = await dealResponse.json();

    if (!dealData.result) {
        return dealData;
    }

    const dealId = dealData.result;

    await fetch(
        `${WEBHOOK}/crm.deal.productrows.set.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: dealId,
                rows: [
                    {
                        PRODUCT_NAME: `Квартира №${apartment.id}`,
                        PRICE: Number(apartment.price),
                        QUANTITY: 1,
                    },
                ],
            }),
        }
    );

    return dealData;
}