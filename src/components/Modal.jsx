function Modal({ close, apartments, reloadApartments }) {
    const [hoveredApartment, setHoveredApartment] = useState(null);
    console.log(hoveredApartment);
    return (
        <div className="hiden-info" onClick={close}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p className="floor-title">4 Этаж</p>

                <button className="button-exit" onClick={close}>
                    Закрыть
                </button>

                <div className="floor-main">
                    <Apartment
                        apartments={apartments}
                        setHoveredApartment={setHoveredApartment}
                    />
                </div>

                <Tooltip
                    apartment={hoveredApartment}
                    closeTooltip={() => setHoveredApartment(null)}
                    reloadApartments={reloadApartments}
                />
            </div>
        </div>
    );
}
