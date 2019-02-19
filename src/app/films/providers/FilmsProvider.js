import React, { useEffect } from 'react';
import useStoreAction from 'app/shared/hooks/useStoreAction';
import * as filmsActionCreators from '../actions';
import useStoreStateSelector from '../../shared/hooks/useStoreStateSelector';
import {
  filmsCountSelector,
  filmsPageableSelector,
  filmsPageLoadingSelector,
  filmsPageSelector
} from '../reducer';
import FilmList from '../components/FilmList';

function FilmsProvider() {
  const pageable = useStoreStateSelector(filmsPageableSelector);
  const loading = useStoreStateSelector(filmsPageLoadingSelector, pageable);
  const count = useStoreStateSelector(filmsCountSelector);
  const films = useStoreStateSelector(filmsPageSelector, pageable, count);
  const loadFilms = useStoreAction(filmsActionCreators.loadFilms);

  useEffect(() => {
    loadFilms();
  }, []);

  if (loading) {
    return <div>Loading films...</div>;
  }
  return <FilmList films={films} />;
}

export default FilmsProvider;
