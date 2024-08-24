// clientコンポーネントとして使用
"use client";

import React, { useEffect, useState } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  //
  useEffect(() => {
    // 位置情報を監視する
    const watchId = navigator.geolocation.watchPosition( (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);  // エラーをクリア
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    // コンポーネントのアンマウント時に監視を停止する
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
}

export default LocationTracker;