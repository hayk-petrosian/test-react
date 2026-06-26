const WEBHOOK =
    "https://b24-whn1gj.bitrix24.ru/rest/1/ga1cyyriofddah3q";

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