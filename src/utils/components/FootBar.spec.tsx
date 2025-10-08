import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@storybook/test';
import FootBar from 'src/utils/components/FootBar';

enum RoutesEnum {
  root = '/',
  payment = '/payment-source',
  expenses = '/expenses',
  profile = '/profile',
  category = '/category',
}

const { mockedNavigate } = vi.hoisted(() => ({ mockedNavigate: vi.fn() }));

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return {
    ...original,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('src/entities/user/model/store/useUserStore.ts', () => ({
  default: {
    use: {
      user: () => ({ username: 'testuser' }),
    },
  },
}));

describe('FootBar', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });
  it('has navigations buttons and renders correctly', () => {
    render(
      <MemoryRouter>
        <FootBar />
      </MemoryRouter>,
    );
    const buttons = screen.getAllByTestId(/navigate-button-/);
    expect(buttons).toHaveLength(4);
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  it('navigates correctly', () => {
    render(
      <MemoryRouter>
        <FootBar />
      </MemoryRouter>,
    );
    const button = screen.getByTestId('navigate-button-0');
    fireEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledWith(RoutesEnum.payment);
  });
  it('IconButton has a variant contained if location route === navigation route', () => {
    render(
      <MemoryRouter initialEntries={[RoutesEnum.profile]}>
        <FootBar />
      </MemoryRouter>,
    );
    const div = screen.getByTestId('navigate-button-2');
    const iconButton = within(div).getByRole('button');
    expect(iconButton).toHaveClass('dUzSPi');
  });
  it('do not have a Fab if location route is root', () => {
    render(
      <MemoryRouter initialEntries={[RoutesEnum.root]}>
        <FootBar />
      </MemoryRouter>,
    );
    const fab = screen.queryByTestId('fab-element');
    expect(fab).not.toBeInTheDocument();
  });
  it('matches snapshot', () => {
    const element = render(
      <MemoryRouter>
        <FootBar />
      </MemoryRouter>,
    );
    expect(element).toMatchSnapshot();
  });
});
