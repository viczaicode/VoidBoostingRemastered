import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import useAuthContext from './contexts/AuthContext';

jest.mock('./contexts/AuthContext', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./components/Navigacio', () => () => <div>Nav Mock</div>);
jest.mock('./components/Footer', () => () => <div>Footer Mock</div>);
jest.mock('./pages/MainPage', () => () => <div>Home Page</div>);
jest.mock('./pages/ServicesPage', () => () => <div>Services Page</div>);
jest.mock('./pages/AboutPage', () => () => <div>About Page</div>);
jest.mock('./pages/SupportPage', () => () => <div>Support Page</div>);
jest.mock('./pages/LogIn', () => () => <div>Login Page</div>);
jest.mock('./pages/Registration', () => () => <div>Registration Page</div>);
jest.mock('./pages/BoostingBelowMasters', () => () => <div>Below Masters Page</div>);
jest.mock('./pages/BoostingAboveMasters', () => () => <div>Above Masters Page</div>);
jest.mock('./components/Cart', () => () => <div>Cart Page</div>);
jest.mock('./admin/pages/Dashboard', () => () => <div>Admin Panel Page</div>);
jest.mock('./admin/pages/BoosterPanel', () => () => <div>Booster Panel Page</div>);
jest.mock('./admin/pages/MyOrdersPanel', () => () => <div>My Orders Panel Page</div>);

const mockUseAuthContext = useAuthContext;

const renderAppAt = (path, authState) => {
  mockUseAuthContext.mockReturnValue(authState);

  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </MemoryRouter>
  );
};

describe('App route protection', () => {
  test('renders public route without authentication', () => {
    renderAppAt('/aboutus', { user: null, authLoading: false });

    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  test('shows loading state when auth is still resolving', () => {
    renderAppAt('/my-orders', { user: null, authLoading: true });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('redirects guests from my-orders to login', () => {
    renderAppAt('/my-orders', { user: null, authLoading: false });

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('allows default user to access my-orders', () => {
    renderAppAt('/my-orders', { user: { role: 0 }, authLoading: false });

    expect(screen.getByText('My Orders Panel Page')).toBeInTheDocument();
  });

  test('blocks booster from my-orders exact role route', () => {
    renderAppAt('/my-orders', { user: { role: 1 }, authLoading: false });

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('allows booster to booster panel', () => {
    renderAppAt('/booster-panel', { user: { role: 1 }, authLoading: false });

    expect(screen.getByText('Booster Panel Page')).toBeInTheDocument();
  });

  test('blocks default user from booster panel min role route', () => {
    renderAppAt('/booster-panel', { user: { role: 0 }, authLoading: false });

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('allows admin to admin panel', () => {
    renderAppAt('/admin-panel', { user: { role: 2 }, authLoading: false });

    expect(screen.getByText('Admin Panel Page')).toBeInTheDocument();
  });

  test('blocks booster from admin panel min role route', () => {
    renderAppAt('/admin-panel', { user: { role: 1 }, authLoading: false });

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
