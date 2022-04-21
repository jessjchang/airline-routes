import React, { useState } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [airline, setAirline] = useState('all');
  const [airport, setAirport] = useState('all');

  const noFiltersSelected = airline === 'all' && airport === 'all';

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

  const handleAirportSelect = (value) => {
    setAirport(value);
  };

  const clearFilters = () => {
    setAirline('all');
    setAirport('all');
  }

  const filteredRoutes = data.routes.filter(route => {
    return (
      (airline === 'all' || airline === route.airline) &&
      (airport === 'all' || airport === route.src || airport === route.dest)
    );
  });

  const filteredAirlines = data.airlines.map(airline => {
    const validMatch = filteredRoutes.some(route => {
      return route.airline === airline.id;
    });

    return { ...airline, validMatch }
  });

  const filteredAirports = data.airports.map(airport => {
    const validMatch = filteredRoutes.some(route => {
      return route.src === airport.code || route.dest === airport.code;
    });

    return { ...airport, validMatch }
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
            enabledKey='validMatch'
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey='code'
            titleKey='name'
            allTitle='All Airports'
            value={airport}
            onSelect={handleAirportSelect}
            enabledKey='validMatch'
          />
          <button onClick={clearFilters} disabled={noFiltersSelected}>
            Clear Filters
          </button>
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