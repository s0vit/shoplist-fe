import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CalculatorButtons from 'src/widgets/Forms/AddExpenseForm/CalculatorButtons.tsx';

describe('Add ExpenseForm', () => {
  it('should render all calculator buttons', () => {
    const mockClick = vi.fn();
    render(<CalculatorButtons isPending={false} handleButtonClick={mockClick} />);

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'del'];

    buttons.forEach((text) => {
      const button = screen.getByTestId(text);
      expect(button).toBeInTheDocument();
    });
  });
  it('should call handleButtonClick with correct value when button is clicked', () => {
    const mockClick = vi.fn();
    render(<CalculatorButtons isPending={false} handleButtonClick={mockClick} />);

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'del'];

    buttons.forEach((text) => {
      const button = screen.getByTestId(text);
      button.click();
      expect(mockClick).toHaveBeenCalledWith(text);
    });

    expect(mockClick).toHaveBeenCalledTimes(buttons.length);
  });
});
