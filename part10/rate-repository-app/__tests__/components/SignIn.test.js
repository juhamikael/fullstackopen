import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '@/components/test-components/SignIn';

describe('SignIn', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    const onSubmit = jest.fn();
    render(<SignIn onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByTestId('usernameField'), 'kalle');
    fireEvent.changeText(screen.getByTestId('passwordField'), 'password');
    fireEvent.press(screen.getByTestId('submitButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
}); 