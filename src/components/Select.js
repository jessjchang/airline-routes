import React from 'react';

const Select = ({
  options,
  valueKey,
  titleKey,
  allTitle,
  value,
  onSelect
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    onSelect(event.target.value);
  };

  const airlineOptions = () => {
    let allAirlines = options.map(airline => (
      <option key={airline[valueKey]} value={airline[valueKey]}>
        {airline[titleKey]}
      </option>
    ));

    allAirlines
      .unshift(<option key='all' value='all'>{allTitle}</option>);

    return allAirlines;
  };

  return (
    <select value={value} onChange={handleChange}>
      {airlineOptions()}
    </select>
  )
};

export default Select;