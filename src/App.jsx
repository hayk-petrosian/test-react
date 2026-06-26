import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/modal';
import { getDeals, getDealFields } from './api/bitrix';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [apartments, setApartments] = useState([]);

    async function loadApartments() {
        const deals = await getDeals();
        console.log('Deals:', deals);
        console.log('Первый deal:', deals[0]);

        const apartmentsFromBitrix = deals.map((deal) => ({
            dealId: Number(deal.ID),
            id: Number(deal.UF_CRM_1782385645823),
            area: Number(deal.UF_CRM_1782385754259),
            price: Number(deal.UF_CRM_1782385781764),
            rooms: Number(deal.UF_CRM_1782385816617),
            floor: Number(deal.UF_CRM_1782385835725),
            status: deal.STAGE_ID === 'NEW' ? 'free' : 'reserved',
        }));
        console.log('Apartments:', apartmentsFromBitrix);
        console.log('Первый apartment:', apartmentsFromBitrix[0]);

        setApartments(apartmentsFromBitrix);
    }

    useEffect(() => {
        loadApartments();
    }, []);

    useEffect(() => {
        console.log(apartments);
    }, [apartments]);

    return (
        <>
            <div className="main">
                <div className="floors">
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>
                    <div className="floor"></div>

                    <div
                        className="floor floor-2"
                        onClick={() => setIsOpen(true)}
                    ></div>

                    <div
                        className="floor floor-1"
                        onClick={() => setIsOpen(true)}
                    ></div>

                    <div className="floor"></div>
                    <div className="floor"></div>
                </div>
            </div>

            {isOpen && (
                <Modal
                    close={() => setIsOpen(false)}
                    apartments={apartments}
                    reloadApartments={loadApartments}
                />
            )}
        </>
    );
}

export default App;
