const chai = require ('chai');
const {expect} = chai;
const Swapi = require ('../framework/api_endpoints');
const FilmSchema = require ('../framework/jsonSchema/films.json');
const FilmModel = require('../framework/helper/fixtures/movie.json');
let response;
let film;
describe ('Films Endpoint Api Suite', async () => {
  it ('Should GET valid JSON schema for films/', async () => {
    const response = await new Swapi ().getFilmsSchema ();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal (200);
    response.body.should.jsonEqual (FilmSchema);
  });

  it ('Should Get Valid responce for films/ endpoint', async () => {
    response = await new Swapi ().getFilmsList ();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal (200);
    filmsData = response.body;
    expect (filmsData.results, JSON.stringify (response)).to.be.an ('array')
      .that.is.not.empty;
    expect (response.count, JSON.stringify (response)).to.not.equal ('null');
    expect (response.count, JSON.stringify (response)).to.not.equal ('undefined');
    let keys = [
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
    for (let value of filmsData.results) {
      expect (value).to.have.keys(keys);
      expect (value.episode_id).to.be.a ('number');
      expect (value.title).to.be.a ('string').that.is.not.empty;
    }
  });

  it ('Should not have pagination at films endpoint', async () => {
    expect (filmsData.next, JSON.stringify (response)).to.be.null;
    expect (filmsData.previous, JSON.stringify (response)).to.be.null;
  });

  it ('Should Get Valid responce for films/id - first film request', async () => {
    response = await new Swapi ().getFilmDetailsByID ('3');
    logger.info(`response is : ${JSON.stringify(response)}`);
    response.statusCode.should.equal (200);
    expect (response.body).to.include.keys (
      'episode_id',
      'title',
      'opening_crawl'
    );
    expect(response.body.episode_id).to.be.a("number");
    expect (response.body.title).to.be.a ('string').that.is.not.empty;
    expect (response.body.opening_crawl).to.be.a ('string').that.is.not.empty;
  });

  it ('Should Get Valid responce for films search', async () => {
    response = await new Swapi ().searchForFilm ({search: 'sith'});
    logger.info(`response is : ${JSON.stringify(response)}`);
    response.statusCode.should.equal (200);
    film = FilmModel.fields;
    console.log(response.body.results[0].title)
    expect (response.body.results[0].title).to.equal (film.title);
  });


});
