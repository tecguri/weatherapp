import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Newui() {

    const [search, setSearch] = useState("punjab");
    const [mapZoom, setMapZoom] = useState("5");

    useEffect(()=>{
        setSearch(search);
        setMapZoom(mapZoom)
    })

    const handleSearch = (e) => {
        if (e.target.value=="") {
            setSearch("punjab");
            setMapZoom("5");
        }else{
            setMapZoom("12");
            setSearch(e.target.value);
        }
    }

    const cardData = [
        {   
            id: 1,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Monday",
            description: 'This is card 1.' 
        },
        {   
            id: 2,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Tuesday",
            description: 'This is card 2.' 
        },
        {   
            id: 3,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Wednesday",
            description: 'This is card 3.' 
        },
        {   
            id: 4,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Thrusday",
            description: 'This is card 4.' 
        },
        {   
            id: 5,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Friday",
            description: 'This is card 5.' 
        },
        {   
            id: 6,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Saturday",
            description: 'This is card 6.' 
        },
        {   
            id: 7,
            temp: Math.floor((Math.random() * 100) + 1),
            wind: Math.floor((Math.random() * 100) + 1),
            humidity: Math.floor((Math.random() * 100) + 1),
            rain: Math.floor((Math.random() * 100) + 1),
            day: "Sunday",
            description: 'This is card 7.' 
        },
    ];

    const airQualityIndex = Math.floor((Math.random() * 100) + 1);

    return (
        <>
            <Card>
                <Card.Body>

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

                    <Container>
                        <Row>
                            <Col>
                                <Image src='https://cdn-icons-png.flaticon.com/256/4814/4814268.png' height={50}></Image>
                            </Col>
                            <Col>
                                <p><span className='cityname'>Mohali</span> (Kharar) <br></br>32 &#8451; | 89.6 &#8457;</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col><p> <img src="https://cdn-icons-png.flaticon.com/256/6221/6221398.png" style={{height:"25px"}}></img><br></br>{Math.floor((Math.random() * 100) + 1)} m/s<br></br>wind</p></Col>
                            <Col><p> <img src="https://cdn-icons-png.flaticon.com/256/6142/6142706.png" style={{height:"25px"}}></img><br></br>{Math.floor((Math.random() * 100) + 1)}% <br></br>Humidity</p></Col>
                            <Col><p> <img src="https://cdn-icons-png.flaticon.com/256/609/609348.png" style={{height:"25px"}}></img><br></br>{Math.floor((Math.random() * 100) + 1)}% <br></br>Rain</p></Col>
                        </Row>
                        <Row>
                            <Col className='airIndex'>
                                <p><Image src="https://cdn-icons-png.flaticon.com/256/3741/3741046.png" style={{height:"30px"}}></Image> Air Quality Index ({airQualityIndex}%)</p>
                                <p> <Form.Range disabled value={airQualityIndex} bsPrefix={'form-range'}/> <br></br> <small>Air quality index is {airQualityIndex}, which is similar to yesterday at about this time.</small></p>
                            </Col>
                        </Row>
                    </Container>

                    <Container style={{margin: "20px 0px",maxWidth: "100%"}}>
                        <div id="map-container-google-2" className="z-depth-1-half map-container" >
                            <iframe src={"https://maps.google.com/maps?q="+search+"&t=&z="+mapZoom+"&zc=&ie=UTF8&iwloc=&output=embed"}
                            style={{border:0, height:200, width:"100%"}} allowFullScreen></iframe>
                        </div>
                    </Container>

                    <p className='sevenday_forcast'><i className='fa fa-calendar'></i> 7-DAY FORECAST</p>
                    <Container className='futureDays'>
                        <Row>
                            {cardData.map((e) => (
                                <Col>
                                    <h5>{e.temp} &#8451;</h5>
                                    <p>{e.day}</p>
                                    <div className='card_section_2'>
                                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/3579/3579552.png" style={{height:"25px"}}></Image><br></br>{e.wind} m/s<br></br>wind</p>
                                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/6142/6142706.png" style={{height:"25px"}}></Image><br></br>{e.humidity}% <br></br>Humidity</p>
                                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/609/609348.png" style={{height:"25px"}}></Image><br></br>{e.rain}% <br></br>Rain</p>
                                    </div>
                                    <div className='card_section_2'>
                                        <p> <Image src="https://cdn-icons-png.flaticon.com/256/3741/3741046.png" style={{height:"30px"}}></Image></p>
                                        <small>Air Quality ({e.rain}%) <br></br> <Form.Range disabled value={e.rain} bsPrefix={'form-range'}/></small>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>


                    
                </Card.Body>
            </Card>
        </>
    )
}
