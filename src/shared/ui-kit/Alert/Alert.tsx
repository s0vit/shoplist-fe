import React from 'react';
import styled from 'styled-components';

export type TAlertProps = {
  /** Содержимое алерта */
  children?: React.ReactNode;
  /** Вариант алерта */
  severity?: 'error' | 'warning' | 'info' | 'success';
  /** Действие */
  action?: React.ReactNode;
  /** Иконка */
  icon?: React.ReactNode;
  /** Дополнительные стили */
  style?: React.CSSProperties;
  /** CSS класс */
  className?: string;
  /** Обработчик закрытия */
  onClose?: () => void;
};

const StyledAlert = styled.div<TAlertProps>`
  display: flex;
  padding: 6px 16px;
  font-size: 0.875rem;
  line-height: 1.43;
  border-radius: 4px;
  letter-spacing: 0.01071em;
  align-items: center;
  font-weight: 400;

  ${({ severity = 'info' }) => {
    const colors = {
      error: {
        backgroundColor: 'var(--color-error)',
        color: 'var(--color-white)',
        border: '1px solid var(--color-error)',
      },
      warning: {
        backgroundColor: 'var(--color-warning)',
        color: 'var(--color-white)',
        border: '1px solid var(--color-warning)',
      },
      info: {
        backgroundColor: 'var(--color-info)',
        color: 'var(--color-white)',
        border: '1px solid var(--color-info)',
      },
      success: {
        backgroundColor: 'var(--color-success)',
        color: 'var(--color-white)',
        border: '1px solid var(--color-success)',
      },
    };

    const style = colors[severity];

    return `
      background-color: ${style.backgroundColor};
      color: ${style.color};
      border: ${style.border};
    `;
  }}
`;

const AlertContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Alert: React.FC<TAlertProps> = ({ children, action, icon, onClose, ...props }) => {
  return (
    <StyledAlert {...props}>
      <AlertContent>
        {icon && <span>{icon}</span>}
        {children}
      </AlertContent>
      {action && <span>{action}</span>}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 'auto',
            color: 'inherit',
            fontSize: '1.2rem',
          }}
        >
          ×
        </button>
      )}
    </StyledAlert>
  );
};

export default Alert;
