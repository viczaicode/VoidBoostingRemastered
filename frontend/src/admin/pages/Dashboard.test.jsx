import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import { myAxios } from '../../api/axios';

jest.mock('../../api/axios', () => ({
  myAxios: {
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../AdminLayout', () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

const ordersFixture = [
  {
    order_id: 11,
    service: { title: 'Solo Boost' },
    buyer: { nickname: 'buyer-a' },
    booster: { nickname: 'booster-a' },
    status: 'pending',
    price: 99,
  },
  {
    order_id: 22,
    service: { title: 'Duo Queue' },
    buyer: { nickname: 'buyer-b' },
    booster: null,
    status: 'completed',
    price: 149,
  },
];

const usersFixture = [
  { user_id: 1, nickname: 'user-a', email: 'a@example.com', role: 0 },
  { user_id: 2, nickname: 'booster-b', email: 'b@example.com', role: 1 },
  { user_id: 3, nickname: 'admin-c', email: 'c@example.com', role: 2 },
];

const setupSuccessfulLoad = () => {
  myAxios.get.mockImplementation((url) => {
    if (url === '/api/orders') {
      return Promise.resolve({ data: ordersFixture });
    }

    if (url === '/api/users') {
      return Promise.resolve({ data: usersFixture });
    }

    return Promise.reject(new Error('Unexpected URL'));
  });
};

const renderDashboard = async () => {
  render(<Dashboard />);
  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
};

describe('Admin Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and renders orders and users data', async () => {
    setupSuccessfulLoad();

    await renderDashboard();

    expect(screen.getByText('#11')).toBeInTheDocument();
    expect(screen.getByText('Solo Boost')).toBeInTheDocument();
    expect(screen.getByText('user-a')).toBeInTheDocument();
    expect(screen.getByText('a@example.com')).toBeInTheDocument();
  });

  test('shows error message when initial load fails', async () => {
    myAxios.get.mockRejectedValue(new Error('load failed'));

    await renderDashboard();

    expect(screen.getByText('Failed to load admin data.')).toBeInTheDocument();
  });

  test('filters orders by status', async () => {
    setupSuccessfulLoad();

    await renderDashboard();

    const selects = screen.getAllByRole('combobox');
    const orderStatusFilterSelect = selects[0];

    await userEvent.selectOptions(orderStatusFilterSelect, 'completed');

    expect(screen.getByText('#22')).toBeInTheDocument();
    expect(screen.queryByText('#11')).not.toBeInTheDocument();
  });

  test('filters orders by search input', async () => {
    setupSuccessfulLoad();

    await renderDashboard();

    const orderSearchInput = screen.getByPlaceholderText('Keresés ID / service / buyer / booster szerint');
    await userEvent.type(orderSearchInput, 'booster-a');

    expect(screen.getByText('#11')).toBeInTheDocument();
    expect(screen.queryByText('#22')).not.toBeInTheDocument();
  });

  test('filters users by role', async () => {
    setupSuccessfulLoad();

    await renderDashboard();

    const selects = screen.getAllByRole('combobox');
    const userRoleFilterSelect = selects[3];

    await userEvent.selectOptions(userRoleFilterSelect, '2');

    expect(screen.getByText('admin-c')).toBeInTheDocument();
    expect(screen.queryByText('user-a')).not.toBeInTheDocument();
    expect(screen.queryByText('booster-b')).not.toBeInTheDocument();
  });

  test('filters users by search input', async () => {
    setupSuccessfulLoad();

    await renderDashboard();

    const userSearchInput = screen.getByPlaceholderText('username / email szerint');
    await userEvent.type(userSearchInput, 'b@example.com');

    expect(screen.getByText('booster-b')).toBeInTheDocument();
    expect(screen.queryByText('admin-c')).not.toBeInTheDocument();
  });

  test('changing order status calls update endpoint', async () => {
    setupSuccessfulLoad();
    myAxios.patch.mockResolvedValue({ data: {} });

    await renderDashboard();

    const selects = screen.getAllByRole('combobox');
    const firstOrderStatusSelect = selects[1];

    await userEvent.selectOptions(firstOrderStatusSelect, 'cancelled');

    await waitFor(() => {
      expect(myAxios.patch).toHaveBeenCalledWith('/api/orders/11', { status: 'cancelled' });
    });
  });

  test('changing user role sends numeric role value', async () => {
    setupSuccessfulLoad();
    myAxios.patch.mockResolvedValue({ data: {} });

    await renderDashboard();

    const selects = screen.getAllByRole('combobox');
    const firstUserRoleSelect = selects[4];

    await userEvent.selectOptions(firstUserRoleSelect, '1');

    await waitFor(() => {
      expect(myAxios.patch).toHaveBeenCalledWith('/api/users/1/role', { role: 1 });
    });
  });

  test('delete user shows backend error message on failure', async () => {
    setupSuccessfulLoad();
    myAxios.delete.mockRejectedValue({
      response: { data: { message: 'Cannot delete this user.' } },
    });

    await renderDashboard();

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    const firstUserDeleteButton = deleteButtons[2];

    await userEvent.click(firstUserDeleteButton);

    expect(await screen.findByText('Cannot delete this user.')).toBeInTheDocument();
  });
});
