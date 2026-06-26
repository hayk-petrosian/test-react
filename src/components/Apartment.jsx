import { useState } from 'react';

function Apartment({ apartments, setHoveredApartment }) {
    console.log("apartments prop:", apartments);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="apartaments">
            {apartments.map((apartment) => (
                <div
                    key={apartment.id}
                    className={`apartament apartament-${apartment.id} ${
                        isHovered ? apartment.status : ''
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        console.log('Apartment:', apartment);
                        console.log('dealId:', apartment.dealId);
                        setHoveredApartment(apartment);
                    }}
                ></div>
            ))}
        </div>
    );
}

export default Apartment;
