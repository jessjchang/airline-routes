import React, { Component } from 'react';
import './App.css';
import data from './data';

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <table>
      <thead>
        <tr>
          <th>airline</th>
          <th>src</th>
          <th>dest</th>
        </tr>
      </thead>
      <tbody>
        {data.routes.map(route => (
          <tr key={route.airline+route.src+route.dest}>
            <td>{route.airline}</td>
            <td>{route.src}</td>
            <td>{route.dest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
</div>
)

export default App;