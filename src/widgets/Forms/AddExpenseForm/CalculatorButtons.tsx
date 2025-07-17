import Grid from 'src/shared/ui-kit/Grid/Grid';
import Button from 'src/shared/ui-kit/Button/Button';
import React from 'react';
import { BsDot } from 'react-icons/bs';
import { FaBackspace } from 'react-icons/fa';
import styles from './AddExpenseCalc.module.scss';

type TCalculatorButtonsProps = {
  isPending: boolean;
  handleButtonClick: (value: string) => void;
};

const CalculatorButtons = ({ isPending, handleButtonClick }: TCalculatorButtonsProps) => {
  const calcButtons: Array<{ title: string; content: React.ReactNode }> = [
    { title: '1', content: '1' },
    { title: '2', content: '2' },
    { title: '3', content: '3' },
    { title: '4', content: '4' },
    { title: '5', content: '5' },
    { title: '6', content: '6' },
    { title: '7', content: '7' },
    { title: '8', content: '8' },
    { title: '9', content: '9' },
    { title: '.', content: <BsDot size={26} /> },
    { title: '0', content: '0' },
    { title: 'del', content: <FaBackspace size={28} /> },
  ];

  return (
    <Grid container spacing={1} justifyContent="space-between">
      {calcButtons.map((value) => (
        <Grid key={value.title} className={styles.buttonGrid}>
          <Button
            key={value.title}
            variant="outlined"
            width="100%"
            label={typeof value.content === 'string' ? value.content : ''}
            onClick={() => handleButtonClick(value.title)}
            disabled={isPending && value.title !== 'del'}
            className={styles.calcButton}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CalculatorButtons;
