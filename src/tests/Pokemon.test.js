import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const peso = screen.getByTestId('pokemon-weight');
    expect(peso).toHaveTextContent('Average weight: 6.0 kg');

    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    const imagem = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', imagem);
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it(`Se o card do pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste pokémon`, () => {
    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: /More details/i });
    expect(detalhes).toBeInTheDocument();
    expect(detalhes).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Se ao clicar no link de navegação do pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de pokémon.`, () => {
    renderWithRouter(<App />);

    const detalhe = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detalhe);
    const titulo = screen.getByRole('heading', { name: 'Pikachu Details' }, { level: 1 });
    expect(titulo).toBeInTheDocument();
  });

  it(`Se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do
  pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);

    const detalhe = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detalhe);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detalhes);
    const favorite = screen.getByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    expect(favorite).toBeChecked();

    const imagem = '/star-icon.svg';
    const favorito = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favorito).toBeInTheDocument();
    expect(favorito).toHaveAttribute('src', imagem);
    expect(favorito).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
