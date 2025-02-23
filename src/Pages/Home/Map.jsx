import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
const Map = () => {
    const areaCoordinates = [
        [23.693550, 90.470468],  // Asma Ali
        [23.694011, 90.481182],  // Signboard Stand
        [23.709589, 90.477999],  // Borovanga
        [23.706627, 90.470461],  // Farmer Mor
    ];

    return (
        <div className='mx-[5%] lg:mx-[10%]'>
            <p className='mahin text-7xl text-center mb-20'>আমাদের থানার অবস্থান</p>
            <MapContainer
                className='map'
                center={[23.700, 90.475]}
                zoom={15}
                scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon
                    positions={areaCoordinates}
                    color='blue'
                    fillColor='blue'
                    opacity={0.3}
                />
            </MapContainer>
        </div>
    );
};

export default Map;

// asma ali = 23.693550, 90.470468
// signboard stand = 23.694010967359272, 90.48118179748248
// borovanga = 23.70958872353337, 90.47799951338466
// farmer mor = 23.706627438200957, 90.4704606403829