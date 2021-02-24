import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('search input is in the dom', () => {
  const { getByTestId } = render(<App />);
  const element = getByTestId('search-rocket-div-id');
  expect(element).toBeInTheDocument();
});
