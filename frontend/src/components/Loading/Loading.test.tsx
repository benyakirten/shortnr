import { render, cleanup } from '@testing-library/react';

import Loading from './Loading.component';

describe('Loading.component.jsx', () => {
  afterEach(cleanup);
  
  it('should render correctly', () => {
    expect(() => render(<Loading />)).not.toThrow();
  });
});