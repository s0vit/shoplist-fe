import { Grid } from 'src/shared/ui-kit';
import { CalculatorButton } from 'src/shared/ui-kit';

import React from 'react';
import styles from './AddExpenseCalc.module.scss';

type TCalculatorButtonsProps = {
  isPending: boolean;
  handleButtonClick: (value: string) => void;
};

const CalculatorButtons = ({ isPending, handleButtonClick }: TCalculatorButtonsProps) => {
  const calcButtons: Array<{ title: string; variant: 'calculator' | 'backspace' | 'comma' }> = [
    { title: '1', variant: 'calculator' },
    { title: '2', variant: 'calculator' },
    { title: '3', variant: 'calculator' },
    { title: '4', variant: 'calculator' },
    { title: '5', variant: 'calculator' },
    { title: '6', variant: 'calculator' },
    { title: '7', variant: 'calculator' },
    { title: '8', variant: 'calculator' },
    { title: '9', variant: 'calculator' },
    { title: '.', variant: 'comma' },
    { title: '0', variant: 'calculator' },
    { title: 'del', variant: 'backspace' },
  ];

  return (
    <Grid container spacing={1} justifyContent="space-between">
      {calcButtons.map((button) => (
        <Grid key={button.title} className={styles.buttonGrid}>
          <CalculatorButton
            variant={button.variant}
            disabled={isPending && button.title !== 'del'}
            className={styles.calcButton}
            onClick={() => handleButtonClick(button.title)}
          >
            {button.variant === 'calculator' ? button.title : undefined}
          </CalculatorButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default CalculatorButtons;
