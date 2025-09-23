import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    // google: typeof google;
    initMap: () => void;
  }
}

const atmList = [
  { name: "State Bank of India ATM", address: "NandanKanan Road, Bhubaneswar" },
  { name: "HDFC Bank ATM", address: "KIIT Road, Bhubaneswar" },
  { name: "Bank of India ATM", address: "Patia Road, Bhubaneswar" },
  { name: "ICICI Bank ATM", address: "Jaydev Vihar, Bhubaneswar" },
  { name: "Sate Bank of India ATM", address: "Saheed Nagar, Bhubaneswar" },
  { name: "Punjab National Bank ATM", address: "Janpath, Bhubaneswar" },
  { name: "Canara Bank ATM", address: "Kharavel Nagar, Bhubaneswar" },
];
const FindNearbyATMs = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);


  const geo = navigator.geolocation;
  geo.getCurrentPosition((position: GeolocationPosition) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  });
  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=efed2218325446e09451e72f70d77f4a&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("User's address:", data.results[0]);
    // const latitude = 20.3266646;
    // const longitude = 85.8370363;
    const zoom = 14; // adjust zoom level (1=world, 20=street)

    // Embed URL
    // const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
  };
  useEffect(() => {
    getUserAddress();
  }, [latitude, longitude]);
  useEffect(() => {
    window.initMap = () => {
      const map: any = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 20.3267, lng: 85.837 },
          zoom: 14,
        }
      );

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        { location: { lat: 20.3267, lng: 85.837 }, radius: 3000, type: "atm" },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("ATMs nearby:", results);
          }
        }
      );
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGJ3xycmjqhbZ02x8KQ2kxt_WQ5RsRn1E&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex h-[calc(100vh-50px)]">
      <div className="w-[30%] h-[calc(100vh-50px)] py-4 overflow-y-auto border-r">
        <h1 className="text-2xl font-bold mb-4 px-4">Nearby ATMs</h1>
        <ul className="pl-5 flex flex-col">
          {atmList.map((atm, index) => (
            <li key={index} className="mb-2 pb-2 border-b-1 border-gray-300">
              {/* <strong>{atm.name}</strong>: {atm.address} */}
              <div className="font-semibold">{atm.name}</div>
              <div className="text-sm text-gray-600">
                ATM &#8226; {atm.address}
              </div>
              <div className="text-green-600 text-sm font-medium">
                Opens 24h
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div id="map" className="h-[100%] w-[100%]" /> */}
      <iframe
        // src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29930.894855474835!2d85.83703633091243!3d20.326664635626802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1satms!5e0!3m2!1sen!2sin!4v1757595099322!5m2!1sen!2sin`}
        // src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29930.894855474835!2d${latitude}!3d${longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1satms!5e0!3m2!1sen!2sin!4v1757595099322!5m2!1sen!2sin`}
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=${15}&output=embed`}

        // src={mapUrl}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      ></iframe>
    </div>
  );
};

export default FindNearbyATMs;
