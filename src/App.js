import React, { useState } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [airline, setAirline] = useState('all');

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

  const handleAirlineSelect = (value) => {
    if (value !== 'all') {
      value = Number(value);
    }

    setAirline(value);
  };

  const filteredRoutes = data.routes.filter(route => {
    return airline === 'all' || airline === route.airline;
  });

  const filteredAirlines = data.airlines.filter(airline => {
    return data.airlines;
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Show routes on
          <Select
            options={filteredAirlines}
            valueKey='id'
            titleKey='name'
            allTitle='All Airlines'
            value={airline}
            onSelect={handleAirlineSelect}
          />
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