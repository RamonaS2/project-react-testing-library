import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Se é exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const semFavorito = screen.getByText('No favorite pokemon found');

    expect(semFavorito).toBeInTheDocument();
  });

  it('Se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const detalhe = screen.getByRole('link', { name: 'More details' });

    userEvent.click(detalhe);
    const det = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(det).toBeInTheDocument();

    const verifyFavoritos = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(verifyFavoritos).toBeInTheDocument();

    userEvent.click(verifyFavoritos);
    const img = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img).toBeInTheDocument();
  });
});
