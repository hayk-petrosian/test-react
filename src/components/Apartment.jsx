import { useState } from "react";

function Apartment({ apartments, setHoveredApartment }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`apartaments ${isHovered ? "show-status" : ""}`}>
            {apartments.map((apartment) => (
                <div
                    key={apartment.id}
                    className={`apartament apartament-${apartment.id} ${apartment.status}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setHoveredApartment(apartment)}
                />
            ))}
        </div>
    );
}

export default Apartment;