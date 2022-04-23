import React from 'react';

const Select = ({
  options,
  valueKey,
  titleKey,
  allTitle,
  value,
  onSelect,
  enabledKey
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    onSelect(event.target.value);
  };

  const optionsDisplay = () => {
    let allOptions = options.map(opt => (
      <option
        key={opt[valueKey]}
        value={opt[valueKey]}
        disabled={!enabledKey || !opt[enabledKey]}
      >
        {opt[titleKey]}
      </option>
    ));

    allOptions
      .unshift(<option key='all' value='all'>{allTitle}</option>);

    return allOptions;
  };

  return (
    <select value={value} onChange={handleChange}>
      {optionsDisplay()}
    </select>
  )
};

export default Select;