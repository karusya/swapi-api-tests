const chai = require('chai');
const { expect } = chai;
const Swapi = require('../framework/api_endpoints');
const FilmSchema = require('../framework/jsonSchema/films.json');
let response;
let filmsResponse;
describe('Films Endpoint Api Suite', async () => {
  it('Should GET valid JSON schema for films/', async () => {
    const response = await new Swapi().getFilmsSchema();
    response.statusCode.should.equal(200);
    response.body.should.jsonEqual(FilmSchema);
  });

  it('Should Get Valid responce for films/ endpoint', async () => {
    response = await new Swapi().getFilmsList();
    filmsData = response.body;
    expect(filmsData.results, JSON.stringify(response)).to.be.an('array').that
      .is.not.empty;
    expect(response.count, JSON.stringify(response)).to.not.equal('null');
    expect(response.count, JSON.stringify(response)).to.not.equal('undefined');
    for(let value of response){
      expect(value).to.have.keys("_id", "title");
      expect(value._id).to.be.a("string").that.is.not.empty;
      expect(value.title).to.be.a("string").that.is.not.empty;
  }
  });

  it('Should not have pagination at films endpoint', async () => {
    expect(filmsData.next, JSON.stringify(response)).to.be.null;
    expect(filmsData.previous, JSON.stringify(response)).to.be.null;
  });

  it('Should Get Valid responce for films/1 - first film request', async () => {
   response = await new Swapi().getFilmDetailsByID('3');
   

  });

  it('Should Get Valid responce for films search', async () => {
    response = await new Swapi().searchForFilm({ search: 'jedi' });
    response.statusCode.should.equal(200);
    expect(filmData.results[0].title, JSON.stringify(response)).to.equal('Return of the Jedi');

  });
});
