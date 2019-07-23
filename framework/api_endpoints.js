const Request = require('./request');

/**
 * Class representing Starwars
 * api module wrapper for methods
 */
class Swapi {
  constructor(BASE_URL = 'https://swapi.co/api/') {
    this.BASE_URL = BASE_URL;
  }

  /**
     * Get all endpoint for healthcheck
     */
  async getAllEndpoints() {
    const resp = await new Request(`${this.BASE_URL}`).send();
    return resp.body;
  }

  /**
     * Get invalid endpoint  for healthcheck
     */
    async getInvalidEndpoint() {
      const resp = await new Request(`${this.BASE_URL}shmiple`).send();
      return resp;
    }

  /**
     * Get people/ endpoint schema
     */
  async getPersonSchema() {
    const resp = await new Request(
      `${this.BASE_URL}people/schema`,
    ).send();
    return resp;
  }

  /**
     * Get all people/ data
     */
  async getPeopleList() {
    const resp = await new Request(`${this.BASE_URL}people/`).send();
    return resp;
  }


  /**
     * Get person detail by ID
     */
  async getPersonDetailsByID(personID) {
    const resp = await new Request(
      `${this.BASE_URL}people/${personID}`,
    ).send();
    return resp;
  }

  /**
     * Get the search by query options
     */
  async searchForPerson(searchCriterias) {
    const resp = new Request(`${this.BASE_URL}people/`)
      .queryParameters(searchCriterias)
      .send();
    return resp;
  }

  /**
     * Get films/ endpoint schema
     */
  async getFilmsSchema() {
    const resp = await new Request(
      `${this.BASE_URL}films/schema`,
    ).send();
    return resp;
  }

  /**
     * Get all films/ data
     */
  async getFilmsList() {
    const resp = await new Request(`${this.BASE_URL}films/`).send();
    return resp;
  }

  /**
     * Get film detail by ID
     */
  async getFilmDetailsByID(filmID) {
    const resp = await new Request(
      `${this.BASE_URL}films/${filmID}`,
    ).send();
    return resp;
  }

  /**
     * Get the search of films by query options
     */
  async searchForFilm(searchCriterias) {
    const resp = new Request(`${this.BASE_URL}films/`)
      .queryParameters(searchCriterias)
      .send();
    return resp;
  }
}

module.exports = Swapi;
