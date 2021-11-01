import { render, screen } from '@testing-library/react';
import App from './App';
import Conversion from './Components/Conversion';



test("renders App modified by me", () => {
 
  render(<App />); 
  const titleElement = screen.getByText(/React App/i); 
  expect(titleElement).toBeInTheDocument(); 
});

test("renders Conversion component", () => {
  render(<Conversion />);
  const titleElement = screen.getByText(/PDF Conversion/i); 
  expect(titleElement).toBeInTheDocument(); 
})