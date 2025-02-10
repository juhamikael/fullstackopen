import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Todo from '../Todos/TodoForTest';

describe('Todo component', () => {
  it('renders todo text', () => {
    render(<Todo text="Introduction to Containers" done={false} />);
    expect(screen.getByText('Introduction to Containers')).toBeInTheDocument();
  });

  it('applies completed class when done', () => {
    render(<Todo text="Introduction to Containers" done={true} />);
    const todoElement = screen.getByText('Introduction to Containers').parentElement;
    expect(todoElement).toHaveClass('completed');
  });
});