import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default function Upperlayer() {

    const [weatherInfo, setWeatherInfo] = useState()

    useEffect(()=>{
        const local_forecastData = localStorage.getItem("forecastData")? localStorage.getItem("forecastData") : [];
        const forecastData = JSON.parse(local_forecastData); 
        // console.log(JSON.parse(forecastData));
        
        setWeatherInfo(forecastData)
    },[])

    
    const cardData = [
        { id: 1, title: 'Card 1', description: 'This is card 1.' },
        { id: 2, title: 'Card 2', description: 'This is card 2.' },
        { id: 3, title: 'Card 3', description: 'This is card 3.' },
        // Add more cards as needed
    ];

    console.log(weatherInfo && weatherInfo['forecast']['forecastday']);
    localStorage.setItem("forecastData",forecastData)
    // console.log(weatherInfo)
    return (
        <>
            <Card className='container'>
                <Card.Body>
                    <div className='upperDiv'>
                        <div>
                            <img src={(weatherInfo && weatherInfo['current']['condition']['icon'])} />
                        </div>
                        <div>
                            <p><span className='cityname'>{(weatherInfo && weatherInfo['location']['name'])}</span> ({(weatherInfo && weatherInfo['location']['country'])})</p>
                            <p>{(weatherInfo && weatherInfo['current']['temp_c'])} &#8451; | {(weatherInfo && weatherInfo['current']['temp_f'])} &#8457;</p>
                        </div>
                    </div>
                    <p>lat {(weatherInfo && weatherInfo['location']['lat'])} | lon {(weatherInfo && weatherInfo['location']['lon'])}</p>
                    <p>last_updated {(weatherInfo && weatherInfo['current']['last_updated'])}</p>
                    <p>wind_mph {(weatherInfo && weatherInfo['current']['wind_mph'])}</p>
                    <p>wind_kph {(weatherInfo && weatherInfo['current']['wind_kph'])}</p>
                    <p>humidity {(weatherInfo && weatherInfo['current']['humidity'])}</p>

                    {/* <div>
                        <div class="card" style={{width:"18rem"}}>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                        <div class="card" style={{width:"18rem"}}>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div> */}


                    <div className="card-container">
                        
                        {weatherInfo && weatherInfo['forecast']['forecastday'].map((e) => (
                            <div key={e.date_epoch} className="card">
                            <h5>{e.date}</h5>
                            <p>{e.date}</p>
                            </div>
                        ))}
                    </div>
                    
                </Card.Body>
            </Card>
            {/* 5092edd9f0c90564ac186a942541cb71 */}
        </>
    )
}

// 7ab4d1928d3c4c62970110840231406
// {
//     "request": {
//         "type": "City",
//         "query": "Mohali, India",
//         "language": "en",
//         "unit": "m"
//     },
//     "location": {
//         "name": "Mohali",
//         "country": "India",
//         "region": "Maharashtra",
//         "lat": "21.283",
//         "lon": "80.250",
//         "timezone_id": "Asia/Kolkata",
//         "localtime": "2023-06-14 16:20",
//         "localtime_epoch": 1686759600,
//         "utc_offset": "5.50"
//     },
//     "current": {
//         "observation_time": "10:50 AM",
//         "temperature": 43,
//         "weather_code": 113,
//         "weather_icons": [
//             "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
//         ],
//         "weather_descriptions": [
//             "Sunny"
//         ],
//         "wind_speed": 22,
//         "wind_degree": 308,
//         "wind_dir": "NW",
//         "pressure": 999,
//         "precip": 0,
//         "humidity": 24,
//         "cloudcover": 13,
//         "feelslike": 46,
//         "uv_index": 10,
//         "visibility": 10,
//         "is_day": "yes"
//     }
// }