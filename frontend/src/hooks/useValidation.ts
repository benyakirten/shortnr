import { useState } from 'react';

import { validate } from '../lib/validation';

type ValidityHook = (valFns: [(val: string) => boolean], initialText?: string, initialValidity?: boolean) => [string, (newText: string) => void, boolean];

const useValidity: ValidityHook = (valFns, initialText = '', initialValidity = false) => {
  const [text, _setText] = useState(initialText);
  const [valid, setValidity] = useState(initialValidity);
  const setText = (newText: string) => {
    const validInput = validate(newText, valFns)
    setValidity(validInput ? true : false);
    _setText(newText);
  }
  return [text, setText, valid]
}

export default useValidity;