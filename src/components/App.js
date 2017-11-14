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
            selectedDate: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDayClicked = this.onDayClicked.bind(this);
    }

    render() {
        const { dates, city, selectedDate} = this.state;
        return <div className="app">
            <ZipForm  onSubmit={this.onFormSubmit} />
            <WeatherList days={dates} onDayClicked={this.onDayClicked}/>
            {selectedDate !== null && <CurrentDay day={dates[selectedDate]} city={city} />}
        </div>;
    }

    onFormSubmit(zipcode) {
        get(`http://localhost:3000/weather/${zipcode}`)
            .then(({ data }) => {
                const { city, list: dates } = data;

                this.setState({ zipcode, city, dates, selectedDate: null });
            });
    }

    onDayClicked(dayIndex) {
        this.setState({ selectedDate: dayIndex });
    }

}


export default App;