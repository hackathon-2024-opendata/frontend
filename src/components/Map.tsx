"use client";

import { useEffect, useRef, useState } from 'react';

interface Props {
  coords: { latitude: number; longitude: number };
  className?: string;
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
  }, [props.coords]);

  return (
    <div className={props.className}>
      <div className="map" ref={ref} style={{ width: '100%', height: '400px' }} />
      <p className="addressLabel">
        現在住所：{addressLabel}
      </p>
    </div>
  );
};

export default View;
