import React, { useState } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';

const App = () => {
  const [airline, setAirline] = useState('all');
  const [airport, setAirport] = useState('all');
  const [selectSort, setSelectSort] = useState('');

  const noFiltersSelected = airline === 'all' &&
    airport === 'all' &&
    selectSort === '';

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
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

  const handleSortByName = () => {
    setSelectSort('name');
  };

  const handleSortByRoutes = () => {
    setSelectSort('routes');
  };

  const clearFilters = () => {
    setAirline('all');
    setAirport('all');
    setSelectSort('');
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

  const filteredAirports = (() => {
    const filtered = data.airports.map(airport => {
      const matches = filteredRoutes.filter(route => {
        return route.src === airport.code || route.dest === airport.code;
      });

      const validMatch = !!matches;

      return { ...airport, validMatch, routeCount: matches.length };
    });

    if (selectSort === 'name') {
      return filtered.sort((airport1, airport2) => airport1.name.localeCompare(airport2.name));
    } else if (selectSort === 'routes') {
      return filtered.sort((airport1, airport2) => airport2.routeCount - airport1.routeCount);
    } else {
      return filtered;
    }
  })();

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map
          airports={data.airports}
          routes={filteredRoutes}
          onClick={handleAirportSelect}
        />
        <div className="airportSort">
          <button onClick={handleSortByName}>
            Sort airports by name
          </button>
          <button onClick={handleSortByRoutes}>
            Sort airports by number of routes
          </button>
        </div>
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