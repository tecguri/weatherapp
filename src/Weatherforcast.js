import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import moment from 'moment';


export default function Weatherforecast() {

    const[weatherInfo, setWeatherInfo] = useState([]);
    const [search, setSearch] = useState("Punjab");
    const [isUpdate, setIsUpdate] = useState(false);
    // const [isVisible, setIsVisible] = useState(true);


    useEffect(() => {
        if(search !== ''){
            const storedItem = localStorage.getItem('weatherInfo')? getWeatherInfo(search) : getWeatherInfo(search);
            if (storedItem) {
                setWeatherInfo({...JSON.parse(storedItem)});
            }
        }
    }, [search])

    useEffect(() => {
        // console.log("useEffect weatherInfo =>", weatherInfo)
    }, [weatherInfo]);

    useEffect(()=>{
        if (search.includes("undefined")) {
            setSearch("Punjab");
        }else{
            setSearch(search);
        }
    }, [isUpdate]);
    
   

    var _changeInterval = null;

    const handleSearch = (e) => {

        clearInterval(_changeInterval)
        _changeInterval = setInterval(function() {
            
            if (e.target.value==="") {
                setSearch("punjab");
                getWeatherInfo("punjab");
            }else{
                setSearch(e.target.value);
                getWeatherInfo(e.target.value);
            }

            clearInterval(_changeInterval)
        }, 2000);

    }

    const handleRange = (e) => {}

    // const [locationName, setLocationName] = useState('');

  useEffect(() => {
    // Request geolocation permission and retrieve coordinates
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const apiKey = 'f88b1aca23814f7c8b31735bb66a9065';
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}`;

          try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            
            if (data) {
                var search_val = data.results[0].components.village+" "+data.results[0].components.postcode
                // console.log(search_val);
                setSearch(search_val);
            }

          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        },
        (error) => {
            setSearch("Punjab");
            console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not available.');
    }
  }, []);
       


    const getWeatherInfo = (e) => {
        if (e.includes("undefined")) {
            e = "Punjab 160055"
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+e+'/next7days?unitGroup=metric&key=28PGKKDFB6FEMZB62Z999YUCZ&contentType=json',
            headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            // console.log(response.data);
            setWeatherInfo(response.data);
            // localStorage.setItem("weatherInfo",JSON.stringify(response.data));
            setIsUpdate(!isUpdate)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const randomVal = Math.floor((Math.random() * 100) + 1);

    const current_condition = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.conditions : "Loading...";
    const current_temp = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.temp : randomVal;
    const current_wind = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.windspeed : randomVal;
    const current_humid = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.humidity : randomVal;
    const current_rain = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.precipprob : randomVal;
    const current_uvindex = (weatherInfo && weatherInfo.currentConditions)? weatherInfo.currentConditions.uvindex : randomVal;

    let weather_icon = "";
    if (current_condition === "Partially cloudy") {
        weather_icon = "https://cdn-icons-png.flaticon.com/256/5370/5370498.png";
    }else if(current_condition === "Overcast") {
        weather_icon = "https://cdn-icons-png.flaticon.com/256/1542/1542627.png";
    }else{
        weather_icon = "https://cdn-icons-png.flaticon.com/256/4814/4814268.png";
    }


    let sevendays_forcast = [];
    if (weatherInfo && weatherInfo.days) {

        weatherInfo.days.map(e =>
            sevendays_forcast.push(
                <Col key={e.datetimeEpoch}>
                    <h5>{Math.ceil(e.temp)} &#8451;</h5>
                    <p>{moment(e.datetime).format('dddd')}</p>
                    <div className='card_section_2'>
                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/3579/3579552.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{Math.ceil(e.windspeed)}m/s<br></br>wind</p>
                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/6142/6142706.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{Math.ceil(e.humidity)}% <br></br>Humidity</p>
                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/609/609348.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{Math.ceil(e.precipprob)}% <br></br>Rain</p>
                    </div>
                    <div className='card_section_2'>
                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/3741/3741046.png" style={{height:"30px"}}></Image></p>
                        <small>UV Index ({e.uvindex}%) <br></br> 
                        <input type="range" min="0" max="100" onChange={handleRange} value={e.uvindex} className="gradient-range" id="colorRange"></input>
                        </small>
                    </div>
                </Col>
            )
        );

        sevendays_forcast = sevendays_forcast.slice(1);

    }


    return (
        <>
            <Card className='main_card'>
                <Card.Body>
                    
                    {/* FIRST SECTION OF THE APP (showing weather icon and temp in C along with location)  */}

                    <InputGroup className="mb-3">
                        <Form.Control 
                        onChange={handleSearch}
                        placeholder="Search location"
                        aria-label="Search location"
                        aria-describedby="basic-addon2"
                        />
                        {/* <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch} >
                        <i className='fa fa-search'></i>
                        </Button> */}
                    </InputGroup>

                    {/* SECOND SECTION OF THE APP (showing wind, hunmidity and rain)  */}

                    <Container>
                        <Row>
                            <Col>
                                <Image src={weather_icon} height={80} alt='decorative image' title='highlighted area'></Image>
                            </Col>
                            <Col>
                                <p><span className='cityname'>{weatherInfo.resolvedAddress}</span><br></br>{current_condition} | {current_temp} &#8451;</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col><p> <Image src="https://cdn-icons-png.flaticon.com/256/6221/6221398.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{current_wind} m/s<br></br>wind</p></Col>
                            <Col><p> <Image src="https://cdn-icons-png.flaticon.com/256/6142/6142706.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{current_humid}% <br></br>Humidity</p></Col>
                            <Col><p> <Image src="https://cdn-icons-png.flaticon.com/256/609/609348.png" style={{height:"25px"}} alt='decorative image'></Image><br></br>{current_rain}% <br></br>Rain</p></Col>
                        </Row>
                        <Row>
                            <Col className='airIndex'>
                                <p><Image src="https://cdn-icons-png.flaticon.com/256/3741/3741046.png" style={{height:"30px"}} alt='decorative image'></Image> UV Index ({current_uvindex}%)</p>
                                <p> <input type="range" min="0" max="100" onChange={handleRange} value={current_uvindex} className="gradient-range" id="colorRange"></input>
                                <br></br> <small>Air quality index is {current_uvindex}, which is similar to yesterday at about this time.</small></p>
                            </Col>
                        </Row>
                    </Container>

                    {/* THIRD SECTION OF THE APP (showing MAP view of default and searched location)  */}

                    <Container style={{margin: "20px 0px",maxWidth: "100%"}}>
                        <div id="map-container-google-2" className="z-depth-1-half map-container" >
                            <iframe src={"https://maps.google.com/maps?q="+search+"&t=&z=6&zc=&ie=UTF8&iwloc=&output=embed"}
                            style={{border:0, height:200, width:"100%"}} allowFullScreen></iframe>
                        </div>
                    </Container>

                    {/* FORTH SECTION OF THE APP (showing next 7-DAY forcast along with basic values)  */}
                    <p className='sevenday_forcast'><i className='fa fa-calendar'></i> 7-DAY FORECAST</p>
                    <Container className='futureDays'>
                        <Row>
                            {sevendays_forcast}
                        </Row>
                    </Container>


                    
                </Card.Body>
            </Card>
        </>
    )
}
