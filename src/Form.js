import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Form({ numDigits, onSubmit }) {
  const [digits, setDigits] = useState(Array(numDigits).fill(""));
  const [focus, setFocus] = useState(0);
  const [error, setError] = useState(false);

  function handleSubmit(event) {
    if (event) event.preventDefault();

    if (!digits.every(Number)) {
      setError(true);
      return;
    }

    onSubmit(Number(digits.join('')));
  }

  function handleChangeByIndex(index) {
    return function onChangeHandler(event) {
      setError(false);
      const number = event.target.value === "" ?
                      "" :
                      Number(event.target.value);

      if (Number.isNaN(number)) return;

      setDigits(digits => [
        ...digits.slice(0, index),
        number,
        ...digits.slice(index + 1, digits.length)
      ]);

      if (number === "" && focus > 0) {
        setFocus(focus => focus - 1);
      } else if (Number.isInteger(number) && focus < digits.length - 1) {
        setFocus(focus => focus + 1);
      }
    }
  }

  useEffect(() => {
    if (digits.every(Number) && focus === digits.length - 1) {
      handleSubmit();
    }
  }, [digits, focus]);

  return (
    <form style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '300px'
          }}
          onSubmit={handleSubmit}  >
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        {digits.map((digit, index) => (
          <input type="text"
                style={{
                  maxWidth: '3rem',
                  lineHeight: '5vh',
                  fontSize: '2rem',
                  textAlign: 'center',
                  padding: '5px',
                  borderRadius: '5px',
                  borderWidth: '1px',
                  borderColor: error ? 'red' : 'inherit'
                }}
                onChange={handleChangeByIndex(index)}
                key={index}
                minLength="0"
                maxLength="1"
                ref={node => {
                  if (node && index === focus) node.focus()
                }}
                value={digit} />
        ))}
      </div>
      <button style={{height: '30px'}} type="submit">Submit</button>
    </form>
  );
}

Form.propTypes = {
  numDigits: PropTypes.number,
  onSubmit: PropTypes.func
}
