import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootswatch/journal/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";


const PLACES = [
  { name: "Kharkiv", id: "706483" },
  { name: "Kyiv", id: "703448" },
  { name: "Lviv", id: "702550" },
  { name: "Odessa", id: "698740" }
];

class App extends Component {

    constructor() {
        super();
        this.state = {
            activePlace: 0,
        };
    }

    render() {
        const activePlace = this.state.activePlace;
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            React Simple Weather App
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={4} sm={4}>
                            <h3>Select a city</h3>
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={activePlace}
                                onSelect={index => {
                                    this.setState({ activePlace: index });
                                }}
                            >
                            {PLACES.map((place, index) => (
                                <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                            ))}
                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <WeatherDisplay key={activePlace} id={PLACES[activePlace].id} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }
    componentDidMount() {
        const cityId = this.props.id;
        const URL = "http://openweathermap.org/data/2.5/weather?id=" +
            cityId +
            "&units=metric&appid=b1b15e88fa797225412429c1c50c122a1";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
        });
    }
    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Current: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
            </div>
        );
    }
}

export default App;
