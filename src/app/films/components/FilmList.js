import React from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { formatDateUTC } from 'app/shared/util/date.util';

function FilmList({ films }) {
  if (films.length) {
    return (
      <>
        {films.map(
          ({
            episode_id: id,
            title,
            director,
            producer,
            release_date: release
          }) => (
            <Card key={id}>
              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{formatDateUTC(release)}</CardSubtitle>
                <CardText>
                  <strong>Director</strong>: <span>{director}</span>
                </CardText>
                <CardText>
                  <strong>Producer</strong>: <span>{producer}</span>
                </CardText>
              </CardBody>
            </Card>
          )
        )}
      </>
    );
  }
  return <div>No results found</div>;
}

FilmList.propTypes = {
  films: arrayOf(
    shape({
      episode_id: number,
      title: string,
      director: string,
      producer: string,
      release_date: string
    })
  )
};

FilmList.defaultProps = {
  films: []
};

export default FilmList;
