import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const det = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Se as informações detalhadas do pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const detalhes = screen.queryByRole('link', { name: det });
    expect(detalhes).toBeInTheDocument();

    userEvent.click(detalhes);
    const tituloDet = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(tituloDet).toBeInTheDocument();
    expect(detalhes).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const resumo = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(resumo).toBeInTheDocument();
  });

  it(`Se existe na página uma seção com os mapas contendo as localizações do
  pokémon`, () => {
    renderWithRouter(<App />);

    const detalhes = screen.queryByRole('link', { name: det });
    expect(detalhes).toBeInTheDocument();

    userEvent.click(detalhes);
    const titulo = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu' });
    expect(titulo).toBeInTheDocument();

    const local1 = screen.getByText('Kanto Viridian Forest');
    const local2 = screen.getByText('Kanto Power Plant');
    expect(local1).toBeInTheDocument();
    expect(local2).toBeInTheDocument();

    const linkLocal1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const linkLocal2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const img = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
    expect(img[0]).toHaveAttribute('src', linkLocal1);
    expect(img[1]).toHaveAttribute('src', linkLocal2);
  });

  it('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const detalhe = screen.queryByRole('link', { name: det });
    expect(detalhe).toBeInTheDocument();

    userEvent.click(detalhe);
    expect(detalhe).not.toBeInTheDocument();

    const favorito = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorito).toBeInTheDocument();

    userEvent.click(favorito);
    const img = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favorito);
    expect(img).not.toBeInTheDocument();
  });
});
