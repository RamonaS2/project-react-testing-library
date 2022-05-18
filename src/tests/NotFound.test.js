import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const titulo = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );
    expect(titulo).toBeInTheDocument();
  });

  it('Se a página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);

    const imagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });

    expect(img.src).toBe(imagem);
  });
});
