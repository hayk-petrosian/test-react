import { reserveApartment } from '../api/bitrix';

function Tooltip({ apartment, closeTooltip, reloadApartments }) {
    if (!apartment) return null;

    const handleReserveApartment = async () => {
        try {
            console.log(apartment);
            console.log('dealId:', apartment.dealId);
            const data = await reserveApartment(apartment.dealId);

            if (data.result) {
                alert('Квартира успешно забронирована!');
                await reloadApartments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(JSON.stringify(apartment, null, 2));
    return (
        <div className="tooltip">
            <h3>Квартира №{apartment.id}</h3>

            <p>
                Статус:
                {apartment.status === 'free' && 'Свободна'}
                {apartment.status === 'reserved' && 'Забронирована'}
                {apartment.status === 'rented' && 'Арендована'}
            </p>
            <p>Комнат: {apartment.rooms}</p>
            <p>Площадь: {apartment.area}</p>
            <p>Этаж: {apartment.floor}</p>
            <p>Стоимость {apartment.price}</p>
            <button className="tooltip-close" onClick={closeTooltip}>
                Закрыть
            </button>

            {apartment.status === 'free' && (
                <button className="rent-btn" onClick={handleReserveApartment}>
                    Арендовать
                </button>
            )}
        </div>
    );
}

export default Tooltip;
