import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigacio from './Navigacio';
import useAuthContext from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

jest.mock('../contexts/AuthContext', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}));

const mockUseAuthContext = useAuthContext;
const mockUseCart = useCart;

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

const renderNavigacio = ({ user = null, getItemCount = 0, logout = jest.fn() } = {}) => {
  mockUseAuthContext.mockReturnValue({ user, logout });
  mockUseCart.mockReturnValue({ getItemCount: () => getItemCount });

  return {
    logout,
    ...render(
      <MemoryRouter
        initialEntries={['/']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Navigacio />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/bejelentkezes" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  };
};

describe('Navigacio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows My Orders link only for role 0 user', () => {
    renderNavigacio({ user: { role: 0, nickname: 'Customer' } });

    expect(screen.getByRole('link', { name: 'My Orders' })).toBeInTheDocument();
  });

  test('shows Booster Panel for booster role', () => {
    renderNavigacio({ user: { role: 1, nickname: 'Booster' } });

    expect(screen.getByRole('link', { name: 'Booster Panel' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Admin Panel' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'My Orders' })).not.toBeInTheDocument();
  });

  test('shows Admin Panel for admin role', () => {
    renderNavigacio({ user: { role: 2, nickname: 'Admin' } });

    expect(screen.getByRole('link', { name: 'Admin Panel' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Booster Panel' })).toBeInTheDocument();
  });

  test('shows login button for guests and no logout button', () => {
    renderNavigacio();

    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /log out/i })).not.toBeInTheDocument();
  });

  test('renders cart count from cart context', () => {
    renderNavigacio({ getItemCount: 3 });

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('cart button navigates to cart page', async () => {
    renderNavigacio();

    await userEvent.click(screen.getByRole('button', { name: /cart/i }));

    expect(screen.getByText('Cart Page')).toBeInTheDocument();
  });

  test('trustpilot button opens external page', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    renderNavigacio();
    await userEvent.click(screen.getByRole('button', { name: /trustpilot/i }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.trustpilot.com/',
      '_blank',
      'noopener,noreferrer'
    );

    openSpy.mockRestore();
  });

  test('logout button calls logout and redirects home', async () => {
    const logout = jest.fn().mockResolvedValue(undefined);

    renderNavigacio({ user: { role: 0, nickname: 'Customer' }, logout });

    await userEvent.click(screen.getByRole('button', { name: /log out/i }));

    await waitFor(() => {
      expect(logout).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('location-display')).toHaveTextContent('/');
    });
  });
});
