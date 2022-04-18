import React, { Component } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';
import Table from './components/Table';

const App = () => {
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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table
          className="routes-table"
          columns={columns}
          rows={data.routes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;