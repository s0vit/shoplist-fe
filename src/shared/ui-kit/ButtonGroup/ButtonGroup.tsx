import React, { Children, cloneElement, isValidElement } from 'react';

export type ButtonGroupProps = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
  joined?: boolean;
  fullWidth?: boolean;
};

const ButtonGroup = ({
  children,
  direction = 'row',
  gap = '8px',
  className,
  style,
  joined = false,
  fullWidth = false,
}: ButtonGroupProps) => {
  const childArray = Children.toArray(children);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: joined ? 0 : gap,
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
    >
      {childArray.map((child, idx) => {
        if (!isValidElement(child)) return child;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const el = child as React.ReactElement<any>;
        let borderRadius = undefined;
        if (joined && direction === 'row') {
          if (idx === 0) borderRadius = 'var(--border-radius-lg) 0 0 var(--border-radius-lg)';
          else if (idx === childArray.length - 1) borderRadius = '0 var(--border-radius-lg) var(--border-radius-lg) 0';
          else borderRadius = '0';
        } else if (joined && direction === 'column') {
          if (idx === 0) borderRadius = 'var(--border-radius-lg) var(--border-radius-lg) 0 0';
          else if (idx === childArray.length - 1) borderRadius = '0 0 var(--border-radius-lg) var(--border-radius-lg)';
          else borderRadius = '0';
        }

        // Прокидываем width: 100% только если fullWidth=true и direction=row
        const childStyle = {
          ...(el.props.style || {}),
          borderRadius,
          margin: 0,
          ...(fullWidth && direction === 'row' ? { width: '100%' } : {}),
        };

        return cloneElement(el, { style: childStyle });
      })}
    </div>
  );
};

export default ButtonGroup;
