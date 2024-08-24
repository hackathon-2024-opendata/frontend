'use client';

interface PinLocation {
    name: string,
    id: number,
    latitude: number,
    longitude: number
}

const fetchData = async (url: string, headers: HeadersInit) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.error("レスポンス不正");
        return;
    }
    const data: PinLocation[] = await response.json();
    console.log(data);
    return data;
}

const GetPinsCoolingShelter = async () => {
    const urlGetCoolingShelter = "http://localhost:5000/cooling-shelter/locations";
    const headers = {
        'mode': 'cors',
        'Content-Type': 'application/json'
    }
    try {
        const data = await fetchData(urlGetCoolingShelter, headers);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default GetPinsCoolingShelter;