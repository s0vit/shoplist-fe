import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

test('basic snapshot test', () => {
  // eslint-disable-next-line i18next/no-literal-string
  const rendered = render(<div>Hello Snapshot</div>);
  expect(rendered).toMatchSnapshot();
});
