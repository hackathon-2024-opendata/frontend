"use client";

import { useEffect, useRef, useState } from 'react';
import GetCoolingShelterList from '../api/GetCoolingShalterList';

interface Props {
  coords: { latitude: number; longitude: number };
  className?: string;
}

const MapComponent = (props: Props) => {
  const [addressLabel, setAddressLabel] = useState('...取得しています');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !window.google) return;

    const { latitude, longitude } = props.coords;
    const center = { lat: latitude, lng: longitude };

    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 16,
    };

    const map = new google.maps.Map(ref.current, mapOptions);
    const markerOptions: google.maps.MarkerOptions = {
      position: center,
      map,
    };

    new google.maps.Marker(markerOptions);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: center }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK && results && results[1]) {
        setAddressLabel(results[1].formatted_address);
      } else {
        setAddressLabel('取得に失敗しました');
      }
    });

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();

    // const pinsCoolingShelter = GetPinsCoolingShelter();
    GetCoolingShelterList().then((pinDatas) => {
      if (pinDatas != undefined){
        for (let count: number = 0; count < pinDatas.length; count++) {
          const pinMarker = new google.maps.Marker({
            position: {
              lat: pinDatas[count].latitude,
              lng: pinDatas[count].longitude
            },
            map: map,
            title: pinDatas[count].name,
            optimized: false,
            icon: {
              url: "/image/icon_cooling_shelter.png"
            }
          });
          // Add a click listener for each marker, and set up the info window.
          const pinTitle = pinMarker.getTitle() ?? ""
          const pinMap = pinMarker.getMap()

          pinMarker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(pinTitle);
            if(pinMap){
              infoWindow.open(pinMap, pinMarker);
            }
          });
        }
      }
    })
  }, [props.coords]);

  // plot the cooling-shelter pins

  return (
    <div className={props.className}>
      <div className="map" ref={ref} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MapComponent;
