import styled from 'styled-components';

type TPrimaryButtonProps = {
  label?: string;
  width?: string;
  height?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  variant?: 'contained' | 'outlined';
  onClick?: () => void;
};

const Button = styled.button<TPrimaryButtonProps>`
  width: ${({ width }) => width || '160px'};
  height: ${({ height }) => height || '53px'};
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0;
  text-transform: none;
  cursor: pointer;
  border: ${({ borderColor }) => `1px solid ${borderColor || 'black'}`};
  color: ${({ textColor }) => textColor || '#FFFFFF'};
  background-color: ${({ backgroundColor, variant }) =>
    variant === 'outlined' ? 'transparent' : backgroundColor || '#000000'};
  &:hover {
    opacity: 0.9;
  }
`;

const PrimaryButton = ({
  label = 'Сохранить',
  variant = 'contained',
  textColor = '#FFFFFF',
  backgroundColor = '#000000',
  borderColor = '1px solid black',
  width = '160px',
  height = '53px',
  onClick,
}: TPrimaryButtonProps) => {
  return (
    <Button
      variant={variant}
      width={width}
      height={height}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
