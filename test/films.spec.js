const chai = require('chai');

const { expect } = chai;
const Swapi = require('../framework/api_endpoints');
const FilmSchema = require('../framework/jsonSchema/films.json');
const FilmModel = require('../framework/helper/fixtures/movie.json');

let response;
let filmsData;
let oneFilmData;
let film;

describe('Films Endpoint Api Suite', async () => {
  it('@04 Should GET valid JSON schema for films/', async () => {
    response = await new Swapi().getFilmsSchema();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal(200);
    response.body.should.jsonEqual(FilmSchema);
  });

  it('@07 Should Get Valid responce for films/ endpoint', async () => {
    response = await new Swapi().getFilmsList();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal(200);
    filmsData = response.body;
    expect(filmsData.results, 'Results is not an array or empty').to.be.an('array') 
    expect(response.count, 'Count is null').to.not.equal('null');
    expect(response.count, 'Count is undefined').to.not.equal('undefined');
    const keys = [
      'characters',
      'created',
      'director',
      'edited',
      'episode_id',
      'opening_crawl',
      'planets',
      'producer',
      'release_date',
      'species',
      'starships',
      'title',
      'url',
      'vehicles',
    ];
    for (const value of filmsData.results) {
      expect(value, 'Value doesn\'t have requires keys').to.have.keys(keys);
      expect(value.episode_id, 'Episode id is not a number').to.be.a('number'); // eslint-disable-next-line no-unused-expressions
      expect(value.title).to.be.a('string').that.is.not.empty;
    }
  });

  it('@10 Should not have pagination at films endpoint', async () => { // eslint-disable-next-line no-unused-expressions
    expect(filmsData.next, 'Next is not null').to.be.null;
    expect(filmsData.previous, 'Previous is not null').to.be.null;
  });

  it('@08 Should Get Valid responce for films/id - first film request', async () => {
    response = await new Swapi().getFilmDetailsByID('3');
    oneFilmData = response.body;
    logger.info(`response is : ${JSON.stringify(response)}`);
    response.statusCode.should.equal(200);
    expect(oneFilmData).to.include.keys(
      'episode_id',
      'title',
      'opening_crawl',
    );
    expect(oneFilmData.episode_id, 'Id is not a number').to.be.a('number'); // eslint-disable-next-line no-unused-expressions
    expect(oneFilmData.title, 'Title is not a string or empty').to.be.a('string').that.is.not.empty;
    expect(oneFilmData.opening_crawl, 'Crawl is not a string or empty').to.be.a('string').that.is.not.empty;
  });

  it('@07 Should validate films endpoint responce against valid JSON schema', async () => {
    expect(oneFilmData).to.be.jsonSchema(FilmSchema);
  });

  it('@09 Should Get Valid responce for films search', async () => {
    response = await new Swapi().searchForFilm({ search: 'sith' });
    logger.info(`response is : ${JSON.stringify(response.code)}`);
    response.statusCode.should.equal(200);
    film = FilmModel.fields;
    expect(response.body.results[0].title).to.equal(film.title);
  });
});
