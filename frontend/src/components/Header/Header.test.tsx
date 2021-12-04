import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header.component';

const mockNav = jest.fn()

const WrappedHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

jest.mock('react-router-dom', () => {
  const reactRouterDom = jest.requireActual('react-router-dom');
  return {
    ...reactRouterDom,
    useNavigate: () => mockNav,
    useLocation: () => ({
      pathname: '/'
    }),
    useHref: () => jest.fn()
  };
});

describe('Header.component.jsx', () => {
  beforeEach(mockNav.mockClear);
  afterEach(cleanup);

  it('should render correctly', () => {
    expect(() => render(<WrappedHeader />)).not.toThrow();
  });

  it('should render a disabled button unless a 5-letter long string is given to the input', async () => {
    render(<WrappedHeader />)
    const button = await screen.findByRole('button');
    const input = await screen.findByRole('textbox');
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'abcde' }});
    expect(button).toBeEnabled();
  });

  it('should navigate programmatically to /{string} when the button is clicked', async () => {
    render(<WrappedHeader />);
    const button = await screen.findByRole('button');
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'abcde' }});
    fireEvent.click(button);

    expect(mockNav).toHaveBeenCalledWith('/abcde');
  })
});