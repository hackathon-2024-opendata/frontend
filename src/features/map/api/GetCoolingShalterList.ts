'use client';

interface PinLocation {
    name: string,
    id: number,
    latitude: number,
    longitude: number
}

const GetCoolingShelterList = async () => {
    const urlGetCoolingShelter = "https://louse-wealthy-dassie.ngrok-free.app/cooling-shelter/locations";
    const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1'
    }
    try {
        const response = await fetch(urlGetCoolingShelter, {headers: headers});
        if (!response.ok) {
            console.error("レスポンス不正");
            return;
        }
        const data: PinLocation[] = await response.json();
            return data;
    } catch (error) {
        console.error(error);
    }
}

export default GetCoolingShelterList;