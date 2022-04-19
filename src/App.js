import React, { useState } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';

const App = () => {
  const [airline, setAirline] = useState('all');
  const airlineId = airline === 'all' ?
    'all' :
    data.airlines.find(({name}) => name === airline)['id'];

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value);
    }
  };

  const handleAirlineSelect = (event) => {
    event.preventDefault();
    if (event.target.value === 'all') {
      setAirline('all');
    } else {
      setAirline(event.target.value);
    }
  };

  const airlineOptions = () => {
    let allAirlines = data.airlines.map(airline => (
      <option key={airline.name} value={airline.name}>
        {airline.name}
      </option>
    ));

    allAirlines
      .unshift(<option key='all' value='all'>All Airlines</option>);

    return allAirlines;
  };

  const filteredRoutes = data.routes.filter(route => {
    return airline === 'all' || airlineId === route.airline;
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Show routes on
          <select value={airline} onChange={handleAirlineSelect}>
            {airlineOptions()}
          </select>
        </p>
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
          perPage={25}
        />
      </section>
    </div>
  );
};

export default App;