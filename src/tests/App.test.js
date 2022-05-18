import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});

it(`Teste se a aplicação é redirecionada para a página inicial,
na URL / ao clicar no link Home da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: 'Home' });
  expect(home).toBeInTheDocument();

  userEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

it(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
ao clicar no link About da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);

  const about = screen.getByRole('link', { name: 'About' });
  expect(about).toBeInTheDocument();

  userEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);

  const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(favorite).toBeInTheDocument();

  userEvent.click(favorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar
em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);

  history.push('notFound');
  const notFound = screen.getByRole(
    'heading', { name: /Page requested not found/i, level: 2 },
  );
  expect(notFound).toBeInTheDocument();
});
