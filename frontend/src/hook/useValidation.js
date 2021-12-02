import { useState } from 'react';

import { validate } from '../lib/validation';

const useValidity = (valFns, initialText = '', initialValidity = false) => {
  const [text, _setText] = useState(initialText);
  const [valid, setValidity] = useState(initialValidity);
  const setText = (newText) => {
    const validInput = validate(newText, valFns)
    setValidity(validInput ? true : false);
    _setText(newText);
  }
  return [text, setText, valid]
}

export default useValidity;