import React from 'react';
import ZipForm from './ZipForm';
import { get } from 'axios';
import WeatherList from "./WeatherList";
import CurrentDay from './CurrentDay';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zipcode: '',
            city: {},
            dates: [],
            weatherData: [],
            selectedDate: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDayClicked = this.onDayClicked.bind(this);
    }

    render() {
        const { weatherData, dates, city, selectedDate} = this.state;
        const zips = weatherData.map(val => val.id);
        return <div className="app">
            <ZipForm  zips={zips} onSubmit={this.onFormSubmit} />
            <WeatherList days={dates} onDayClicked={this.onDayClicked}/>
            {selectedDate !== null && <CurrentDay day={dates[selectedDate]} city={city} />}
        </div>;
    }

    onFormSubmit(zip) {
        const zipcode = zip*1;
        const {weatherData} = this.state;
        const data = weatherData.find(wd => wd.id === zipcode);
        const { city , list : dates} = data;
        this.setState({zipcode, city, dates, selectedData: null});
    }

    onDayClicked(dayIndex) {
        this.setState({ selectedDate: dayIndex });
    }

    componentDidMount(){
        get('http://localhost:3000/weather')
            .then(({data:weatherData}) => {
                this.setState({weatherData});
            });
    }

}


export default App;