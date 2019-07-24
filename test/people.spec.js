const chai = require('chai');
const Swapi = require('../framework/api_endpoints');

const { expect } = chai;
const PersonSchema = require('../framework/jsonSchema/people.json');
const PersonModel = require('../framework/helper/fixtures/person.json');

let response;
let peopleData;
let personData;
let person;


describe('People Endpoint Api Suite', async () => {
  it('@03 Should GET valid JSON schema for people/', async () => {
    response = await new Swapi().getPersonSchema();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    response.statusCode.should.equal(200);
    response.body.should.jsonEqual(PersonSchema);
  });

  it('@05 Should Get Valid responce for people/ endpoint', async () => {
    response = await new Swapi().getPeopleList();
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    peopleData = response.body; // eslint-disable-next-line no-unused-expressions
    expect(peopleData.results, 'Results is not an array or empty').to.be.an('array')
      .that.is.not.empty;
    expect(response.count, 'Count is null').to.not.equal('null');
    expect(response.count, 'Count is undefined').to.not.equal('undefined');
  });

  it('@12 People Endpoint should have pagination', async () => {
    expect(peopleData.next, 'Next element is  null').to.not.equal('null');
  });

  it('@13 Should Get Valid details for people/1 - search by id', async () => {
    response = await new Swapi().getPersonDetailsByID('1');
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
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
    for (let i = 0, len = keys.length; i < len; i++) { // eslint-disable-next-line no-unused-expressions
      expect(personData[keys[i]]).to.not.be.undefined;
    }
    expect(personData.name, 'Data is not a string or empty').to.be.a('string') // eslint-disable-next-line no-unused-expressions
      .that.is.not.empty;
  });

  it('@05 Should validate people endpoint responce against valid JSON schema', async () => {
    expect(personData).to.be.jsonSchema(PersonSchema);
  });

  it('@14 Should be able to load page=2 for search with more than 1 page', async () => {
    response = await new Swapi().searchForPerson({ search: 'a', page: '2' });
    response.statusCode.should.equal(200);
    const data = response.body;
    expect(data.previous).to.match(/page=1/);
    expect(data.next).to.match(/page=3/);
  });


  it('@15 Should Get Valid responce for people search - r2', async () => {
    response = await new Swapi().searchForPerson({ search: 'r2' });
    response.statusCode.should.equal(200);
    logger.info(`response is : ${JSON.stringify(response.statusCode)}`);
    person = PersonModel.fields;
    expect(response.body.results[0].name, 'Name does not equal expected value').to.equal(person.name);
  });
});
