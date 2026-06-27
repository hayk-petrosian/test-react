import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/modal';
import { getDeals } from './api/bitrix';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [apartments, setApartments] = useState([]);

    async function loadApartments() {
        const deals = await getDeals();

        const apartmentsFromBitrix = deals.map((deal) => ({
            dealId: Number(deal.ID),
            id: Number(deal.UF_CRM_1782385645823),
            area: Number(deal.UF_CRM_1782385754259),
            price: Number(deal.UF_CRM_1782385781764),
            rooms: Number(deal.UF_CRM_1782385816617),
            floor: Number(deal.UF_CRM_1782385835725),
            status: deal.STAGE_ID === 'NEW' ? 'free' : 'reserved',
        }));

        deals.forEach((deal) => {
            console.log(deal.ID, deal.STAGE_ID);
        });
        setApartments(apartmentsFromBitrix);
    }

    useEffect(() => {
        loadApartments();
    }, []);

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
