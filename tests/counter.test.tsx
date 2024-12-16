// import { render ,screen} from '@testing-library/react';
// import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

// import { render, screen } from '@testing-library/react';
// import { expect } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import Counter from '../components/counter';

// describe('Counter component', () => {
//   it('renders initial count', () => {
//     render(<Counter />);
//     expect(screen.getByText('Count: 0')).toBeInTheDocument();
//   });

//   it('increments count when + button is clicked', async () => {
//     render(<Counter />);
//     const incrementButton = screen.getByText('+');
//     await userEvent.click(incrementButton);
//     expect(screen.getByText('Count: 1')).toBeInTheDocument();
//   });

//   it('decrements count when - button is clicked', () => {
//     render(<Counter />);
//     const decrementButton = screen.getByText('-');
//     userEvent.click(decrementButton);
//     expect(screen.getByText('Count: -1')).toBeInTheDocument();
//   });
// });

// import Counter from '../components/counter';
// import userEvent from '@testing-library/user-event';
// import {test, expect} from "vitest"
// // import { toHaveClass, toHaveTextContent,toBeInTheDocument } from '@testing-library/jest-dom/matchers';
// // expect.extend({ toHaveClass, toHaveTextContent ,toBeInTheDocument});
// test('Counter component', () => {
//   // Test 1: Renders initial count
//   render(<Counter />);
//   expect(screen.getByText('Count: 0')).toBeInTheDocument();

//   // Test 2: Increments count when + button is clicked
//   const incrementButton = screen.getByText('+');
//   userEvent.click(incrementButton);
//   expect(screen.getByText('Count: 1')).toBeInTheDocument();

//   // Test 3: Decrements count when - button is clicked
//   const decrementButton = screen.getByText('-');
//   userEvent.click(decrementButton);
//   expect(screen.getByText('Count: -1')).toBeInTheDocument();
// });

// Counter.test.tsx
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import Counter from '../components/counter';

describe('Counter component', () => {
  let incrementButton: HTMLElement;
  let decrementButton: HTMLElement;

  beforeEach(() => {
    render(<Counter />);
    incrementButton = screen.getByText('+');
    decrementButton = screen.getByText('-');
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the initial count', () => {
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments the count when the + button is clicked', () => {
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements the count when the - button is clicked', () => {
    fireEvent.click(decrementButton);
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  it('increments and decrements the count multiple times', () => {
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('initial button state', () => {
    expect(incrementButton).toBeEnabled();
    expect(decrementButton).toBeEnabled();
  });

  it('edge case: clicking decrement button when count is 0', () => {
    fireEvent.click(decrementButton);
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });
});