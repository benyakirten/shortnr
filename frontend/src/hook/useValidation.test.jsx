import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { exactLength } from '../lib/validation';

import useValidation from './useValidation';

const Wrapper = () => {
  const [text, setText, valid] = useValidation([exactLength]);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <article>{valid.toString()}</article>
    </>
  );
};

describe('useValidation.js', () => {
  afterEach(cleanup);

  it('should display a false for valid if the text is not valid', () => {
    render(<Wrapper />);
    const output = screen.getByRole('article');
    expect(output.textContent).toEqual('false');
  });

  it('should display a true for valid if the text is valid', () => {
    render(<Wrapper />);
    const input = screen.getByRole('textbox');
    const output = screen.getByRole('article');

    fireEvent.change(input, { target: { value: 'abcde' } });
    expect(output.textContent).toEqual('true');
  });
});
