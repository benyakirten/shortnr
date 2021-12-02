import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Button from './Button.component';

describe('Button.component.jsx', () => {
  const clickSpy = jest.fn();

  beforeEach(clickSpy.mockClear);
  afterEach(cleanup);

  it('should render properly', () => {
    expect(() => render(<Button />)).not.toThrow();
  });

  it('should not call the onClick method if the button is disabled', () => {
    render(<Button onClick={clickSpy} disabled={true} />);
    const button = screen.getByRole('button');
    expect(clickSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(0);
  });

  it('shoud call the onClick method if the button is not disabled', () => {
    render(<Button onClick={clickSpy} disabled={false} />);
    const button = screen.getByRole('button');
    expect(clickSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});