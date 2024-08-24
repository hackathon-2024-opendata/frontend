"use client";

import View from "../components/Map";
import { useEffect, useState } from "react";
import Script from "next/script";

import { Button, Stack, TableContainer, TextField, Typography } from "@mui/material";

export default function HomePage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const google_map_url = "https://maps.googleapis.com/maps/api/js?key=" + process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY + "&libraries=places";
  
  useEffect(() => {
    // ユーザーの現在位置を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("位置情報の取得に失敗しました: ", error);
      }
    );
  }, []);

  return (
    <div>
      <h1>Google Maps with Next.js</h1>

      {/* Google Maps APIのスクリプトを読み込む */}
      <Script
        src={google_map_url}
        strategy="lazyOnload"
        onLoad={() => setIsGoogleLoaded(true)}  // APIがロードされたらフラグを立てる
      />

      {coords && isGoogleLoaded ? (
        <View coords={coords} className="map-container" />
      ) : (
        <p>位置情報を取得中です...</p>
      )}
    </div>
  );
}
