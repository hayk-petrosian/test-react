import { reserveApartment, createDeal } from "../api/bitrix";

function Tooltip({ apartment, closeTooltip, reloadApartments }) {
    if (!apartment) return null;

    const handleReserveApartment = async () => {
        try {
            const data = await reserveApartment(apartment.dealId);

            if (data.result) {
                alert("Квартира успешно забронирована!");
                await reloadApartments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="tooltip">
            <h3>Квартира №{apartment.id}</h3>

            <p>
                Статус:
                {apartment.status === "free" && "Свободна"}
                {apartment.status === "reserved" && "Забронирована"}
                {apartment.status === "rented" && "Продана"}
            </p>

            <p>Комнат: {apartment.rooms}</p>
            <p>Площадь: {apartment.area}</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Стоимость: {apartment.price} ₽</p>

            <button
                className="tooltip-close"
                onClick={closeTooltip}
            >
                Закрыть
            </button>

            {apartment.status === "free" && (
                <>
                    <button
                        className="rent-btn"
                        onClick={handleReserveApartment}
                    >
                        Забронировать
                    </button>
                </>
            )}
        </div>
    );
}

export default Tooltip;