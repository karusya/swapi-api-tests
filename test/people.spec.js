const chai = require ('chai');
const Swapi = require ('../framework/api_endpoints');

const {expect} = chai;
const PersonSchema = require ('../framework/jsonSchema/people.json');
const PersonModel = require('../framework/helper/fixtures/person.json')

let response;
let peopleData;
let personData;

describe ('People Endpoint Api Suite', async () => {
  it ('Should GET valid JSON schema for people/', async () => {
    response = await new Swapi ().getPersonSchema ();
    logger.info (`response is : ${JSON.stringify (response.statusCode)}`);
    response.statusCode.should.equal (200);
    response.body.should.jsonEqual (PersonSchema);
  });

  it ('Should Get Valid responce for people/ endpoint', async () => {
    response = await new Swapi ().getPeopleList ();
    logger.info (`response is : ${JSON.stringify (response.statusCode)}`);
    peopleData = response.body;
    expect (peopleData.results, JSON.stringify (response)).to.be.an ('array')
      .that.is.not.empty;
    expect (response.count, JSON.stringify (response)).to.not.equal ('null');
    expect (response.count, JSON.stringify (response)).to.not.equal (
      'undefined'
    );
  });

  it ('People Endpoint should have pagination', async () => {
    expect (peopleData.next, 'Next element is  null').to.not.equal ('null');
  });

  it ('Should Get Valid details for people/1 - search by id', async () => {
    response = await new Swapi ().getPersonDetailsByID ('1');
    logger.info (`response is : ${JSON.stringify (response.statusCode)}`);
    personData = response.body;
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
      expect (personData[keys[i]]).to.not.be.undefined;
    }
    expect (personData.name, JSON.stringify (personData)).to.be.a ('string')
      .that.is.not.empty; // eslint-disable no-unused-expressions
  });


  it ('Should be able to get page=2 of Peoples list', async () => {
    response = await new Swapi ().searchForPerson ({search: 'a'});
    swapiModule.getPeople (2, function (people) {
      var keys = ['count', 'next', 'previous', 'results'];
      for (var i = 0, len = keys.length; i < len; i++) {
        expect (people[keys[i]]).toBeDefined ();
      }
      expect (people.previous).toMatch ('page=1');
    });
  });

  it ('Should Get Valid responce for people search - r2', async () => {
    response = await new Swapi ().searchForPerson({search: 'r2'});
    response.statusCode.should.equal (200);
    logger.info (`response is : ${JSON.stringify (response.statusCode)}`);
    person = PersonModel.fields;
    console.log(response.body.results[0].name)
    expect (response.body.results[0].name).to.equal(person.name);
  });

  it ('Should Get Valid responce for people search - r2', async () => {
    response = await new Swapi ().searchForPerson({search: 'r2'});
    response.statusCode.should.equal (200);
    console.log(response.body);
    logger.info (`response is : ${JSON.stringify (response.statusCode)}`);
    person = PersonModel.fields;
    console.log(response.body.results[0].name)
    expect (response.body.results[0].name).to.equal(person.name);
  });

  it ('Should GET valid JSON schema for films/', async () => {
    const response = await new Swapi ().getFilmsSchema ();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal (200);
    response.body.should.jsonEqual (FilmSchema);
  });
});
