import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Form from './Form.component';

describe('Form.component.jsx', () => {
  const submitSpy = jest.fn();

  beforeEach(submitSpy.mockClear);
  afterEach(cleanup);
  
  it('should render properly', () => {
    expect(() => render(<Form onSubmit={() => {}} />)).not.toThrow();
  });

  it('should call the preventDefault method on the event object', () => {
    render(<Form onSubmit={submitSpy}><article>Text</article></Form>);
    expect(submitSpy).toHaveBeenCalledTimes(0);

    const article = screen.getByRole('article');
    const form = article.parentElement!;
    const event = fireEvent.submit(form);
    
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(event).toBe(false);
  })
});