const chai = require('chai');
const Swapi = require('../framework/api_endpoints');

const { expect } = chai;
const PersonSchema = require('../framework/jsonSchema/people.json');

let response;
let peopleData;

describe('People Endpoint Api Suite', async () => {
  it('Should GET valid JSON schema for people/', async () => {
    response = await new Swapi().getPersonSchema();
    response.statusCode.should.equal(200);
    response.body.should.jsonEqual(PersonSchema);
  });

  it('Should Get Valid responce for people/ endpoint', async () => {
    response = await new Swapi().getPeopleList();
    peopleData = response.body;
    expect(peopleData.results, JSON.stringify(response)).to.be.an('array').that
      .is.not.empty;
    expect(response.count, JSON.stringify(response)).to.not.equal('null');
    expect(response.count, JSON.stringify(response)).to.not.equal('undefined');
  });

  it('People Endpoint should have pagination', async () => {
    expect(peopleData.next, 'Next element is  null').to.not.equal('null');
  });

  it('Should Get Valid details for people/1 - search by id', async () => {
    response = await new Swapi().getPersonDetailsByID('1');
    const keys = [
      'birth_year',
      'created',
      'edited',
      'eye_color',
      'films',
      'gender',
      'hair_color',
      'height',
      'homeworld',
      'mass',
      'name',
      'skin_color',
      'species',
      'starships',
      'url',
      'vehicles',
    ];
    for (let i = 0, len = keys.length; i < len; i++) {
      expect(person[keys[i]]).to.be.defined;
    }
    const userDetails = response.body; // eslint-disable-next-line no-unused-expressions
    expect(usrDetails.emails, JSON.stringify(usrDetails)).to.be.an('array')
      .that.is.not.empty; // eslint-disable-next-line no-unused-expressions
    expect(usrDetails.username, JSON.stringify(usrDetails)).to.be.a('string')
      .that.is.not.empty;
  });

  xit('Should be able to get page=2 of Peoples list', async () => {
    swapiModule.getPeople(2, function(people) {
      var keys = ["count", "next", "previous", "results"];
      for(var i=0, len=keys.length; i<len; i++) {
          expect(people[keys[i]]).toBeDefined();
      }
      expect(people.previous).toMatch("page=1");
  });
});

  it('Should Get Valid responce for people search', async () => {
    response = await new Swapi().searchForFilm({ search: 'r2' });
  });
});
