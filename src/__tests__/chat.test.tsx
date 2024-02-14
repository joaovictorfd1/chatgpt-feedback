import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Chat from '../app/[id]/page';

describe('Chat component', () => {
  it('Verificar se está sendo renderizado o componente com o modal fechado', () => {
    render(<Chat />);

     waitFor(() => {
      expect(screen.getByText('Question:')).toBeInTheDocument();
      expect(screen.getByText('Answer:')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Cancel/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Submit/i })).not.toBeInTheDocument();
    });
  });

  it('toggles positive feedback button', async () => {
    render(<Chat />);

    await waitFor(() => {
      screen.getByTestId('positiveButton').click();
    });
    expect(screen.getByTestId('positiveButton')).toHaveClass('selected-positive-button');
  });

  it('toggles positive feedback button', async () => {
    render(<Chat />);

    await waitFor(() => {
      screen.getByTestId('negativeButton').click();
    });
    expect(screen.getByTestId('negativeButton')).toHaveClass('selected-negative-button');
  });
})
