import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Input from './Input.component';

describe('Input.component.jsx', () => {
  const mockTextChange = jest.fn();

  beforeEach(mockTextChange.mockClear);
  afterEach(cleanup);

  it('should render correctly', () => {
    expect(() => render(<Input />)).not.toThrow();
  });

  it('should call the onChange function with the new text rather than the event', async () => {
    render(<Input onChange={mockTextChange} />);
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockTextChange).toHaveBeenCalledWith('new value');
  })
});