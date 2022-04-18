import React, { Component } from 'react';
import './App.css';
import data, { getAirlineById, getAirportByCode } from './data';

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <table>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {data.routes.map(route => (
          <tr key={route.airline+route.src+route.dest}>
            <td>{getAirlineById(route.airline)}</td>
            <td>{getAirportByCode(route.src)}</td>
            <td>{getAirportByCode(route.dest)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
</div>
)

export default App;