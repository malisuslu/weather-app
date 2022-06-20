import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';

let data = [];

if (localStorage.getItem('data') !== null) {
  data = JSON.parse(localStorage.getItem('data'));
} else {

  axios(`https://countriesnow.space/api/v0.1/countries`)
  .then(res => {
    res.data.data.forEach(element => {
      data = data.concat(element.cities);
    })
    data.sort();
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
  })
    .catch(err => {
      console.log(err);
  })
}


function Input({setCity}, props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  function getSuggestions(value) {
    let optionValues = [];
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    data.forEach(option => {
      if (count < 8 && option.toLowerCase().slice(0, inputLength) === inputValue) {
        optionValues.push({
          value: option.toLowerCase(),
          label: option
        });
        count += 1;
      }
    });
    setOptions(optionValues);
  }

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
    setCity(selectedOption.value);
  }

  return (
    <div className="form-group">
      <Select
        // defaultValue="ankara"
        // defaultInputValue="ankara"
        autoFocus={true}
        className="form-control"
        value={selectedOption}
        onChange={handleChange}
        onInputChange={getSuggestions}
        options={options}
        placeholder="Select a city"
        noOptionsMessage = {() => "No options"}
        isSearchable={true}
      />
    </div>
  );
}

export default Input;