import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

const filmsService = {
  fetchPage(pageable = { page: 1, limit: 10 }) {
    const { page = 1, limit = 10 } = pageable;
    return from(global.fetch(`/api/films?page=${page}&limit=${limit}`)).pipe(
      switchMap(response => from(response.json())),
      map(({ results: films, count }) => ({
        films,
        count
      }))
    );
  }
};

export default filmsService;
