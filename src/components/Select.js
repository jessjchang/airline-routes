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

  const optionsDisplay = () => {
    let allOptions = options.map(opt => (
      <option key={opt[valueKey]} value={opt[valueKey]}>
        {opt[titleKey]}
      </option>
    ));

    allOptions.sort((option1, option2) => option1.props.children.localeCompare(option2.props.children));

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