import React from 'react';
import { render } from 'react-testing-library';

import FilmList from './FilmList';

describe('FilmList component', () => {
  describe('when "films" prop is not provided', () => {
    it('it renders a text "No results found"', () => {
      const { getByText } = render(<FilmList />);
      const element = getByText('No results found');
      expect(element).toBeTruthy();
    });
  });

  describe('when a array of films with length = 1 is provided as "films" prop', () => {
    const films = [
      {
        episode_id: 1,
        title: 'Film 1',
        director: 'Director 1',
        producer: 'Producer 1',
        release_date: '1977-05-25'
      }
    ];
    const { getByText } = render(<FilmList films={films} />);

    const filmNameEl = getByText('Film 1');
    expect(filmNameEl).toBeTruthy();
    const directorEl = getByText('Director 1');
    expect(directorEl).toBeTruthy();
    const producerEl = getByText('Producer 1');
    expect(producerEl).toBeTruthy();
    const releaseDate = getByText('January 1, 2019');
    expect(releaseDate).toBeTruthy();
  });

  describe('when a array of films with length = 2 is provided as "films" prop', () => {
    const films = [
      {
        episode_id: 1,
        title: 'Film 1',
        director: 'Director 1',
        producer: 'Producer 1',
        release_date: '2019-01-01'
      },
      {
        episode_id: 2,
        title: 'Film 2',
        director: 'Director 2',
        producer: 'Producer 2',
        release_date: '2019-01-02'
      }
    ];
    const { getByText } = render(<FilmList films={films} />);

    const filmNameEl1 = getByText('Film 1');
    expect(filmNameEl1).toBeTruthy();
    const directorEl1 = getByText('Director 1');
    expect(directorEl1).toBeTruthy();
    const producerEl1 = getByText('Producer 1');
    expect(producerEl1).toBeTruthy();
    const releaseDate1 = getByText('January 1, 2019');
    expect(releaseDate1).toBeTruthy();

    const filmNameEl2 = getByText('Film 2');
    expect(filmNameEl2).toBeTruthy();
    const directorEl2 = getByText('Director 2');
    expect(directorEl2).toBeTruthy();
    const producerEl2 = getByText('Producer 2');
    expect(producerEl2).toBeTruthy();
    const releaseDate2 = getByText('January 2, 2019');
    expect(releaseDate2).toBeTruthy();
  });
});
