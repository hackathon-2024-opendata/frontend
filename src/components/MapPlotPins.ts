'use client';

interface PinLocation {
    name: string,
    id: number,
    latitude: number,
    longitude: number
}

const fetchData = async (url: string, headers: HeadersInit) => {
    // const response = await fetch(url);
    // if (!response.ok) {
    //     throw new Error('response error');
    // }
    const response = {
        // 通常のResponseのプロパティやメソッドを模倣
        ok: true,
        status: 200,
        headers: new Headers({ 'Content-Type': 'application/json' }),
      
        // json() メソッドを模倣し、PromiseでJSONデータを返す
        json: async function () {
          // PromiseでJSONデータを返す
          return [
            {
                "name": "東京タワー",
                "id": 1,
                "latitude": 35.658581,
                "longitude": 139.745433
            },
            {
                "name": "東京スカイツリー",
                "id": 2,
                "latitude": 35.7100063,
                "longitude": 139.8107
            }
        ];
        }
      }

    const data: PinLocation[] = await response.json();
    console.log(data);
    return data;
}

const GetPinsCoolingShelter = async () => {
    const urlGetCoolingShelter = "http://localhost:5000/cooling-sholter/locations";
    const headers = {
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