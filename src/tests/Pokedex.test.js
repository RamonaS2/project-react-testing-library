import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it(`Se é exibido o próximo pokémon da lista quando o botão Próximo
    pokémon é clicado.`, () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeDefined();
    expect(name).toHaveTextContent('Pikachu');

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(button);
    expect(name).toHaveTextContent('Charmander');

    userEvent.click(button);
    expect(name).toHaveTextContent('Caterpie');

    userEvent.click(button);
    expect(name).toHaveTextContent('Ekans');

    userEvent.click(button);
    expect(name).toHaveTextContent('Alakazam');

    userEvent.click(button);
    expect(name).toHaveTextContent('Mew');

    userEvent.click(button);
    expect(name).toHaveTextContent('Rapidash');

    userEvent.click(button);
    expect(name).toHaveTextContent('Snorlax');

    userEvent.click(button);
    expect(name).toHaveTextContent('Dragonair');

    userEvent.click(button);
    expect(name).toHaveTextContent('Pikachu');
  });

  it('Se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const poke = screen.getAllByText(/more/i);
    expect(poke).toHaveLength(1);
  });

  it('Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttons = screen.getByRole('button', { name: 'All' });
    expect(buttons).toHaveTextContent('All');

    const button = screen.getAllByTestId('pokemon-type-button');

    expect(button[0]).toHaveTextContent('Electric');

    expect(button[1]).toHaveTextContent('Fire');

    expect(button[2]).toHaveTextContent('Bug');

    expect(button[3]).toHaveTextContent('Poison');

    expect(button[4]).toHaveTextContent('Psychic');

    expect(button[5]).toHaveTextContent('Normal');

    expect(button[6]).toHaveTextContent('Dragon');
  });

  it('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'All' });
    userEvent.click(button);

    const testPikachu = screen.getByText('Pikachu');
    expect(testPikachu).toBeInTheDocument();
  });
});
