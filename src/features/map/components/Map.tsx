"use client";

import { useEffect, useRef, useState } from 'react';
import GetPinsCoolingShelter from "../components/MapPlotPins"

interface Props {
  coords: { latitude: number; longitude: number };
  className?: string;
}

interface PinLocation {
  name: string,
  id: number,
  latitude: number,
  longitude: number
}

const View = (props: Props) => {
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
    GetPinsCoolingShelter().then((pinDatas) => {
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
          pinMarker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(pinMarker.getTitle());
            infoWindow.open(pinMarker.getMap(), pinMarker);
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

export default View;
