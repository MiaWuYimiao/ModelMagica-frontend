import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ModelmagicaApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ModelmagicaApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get works (filtered by type if not undefined) */

  static async getWorks(data) {
    let res = await this.request("works", data);
    return res.works;
  }

  /** Get details on a work by workID. */

  static async getWork(id) {
    let res = await this.request(`works/${id}`);
    return res.work;
  }

  /** Upload a new work  */

  static async uploadWork(data) {
    let res = await this.request("works", data, "post");
    return res.work;
  }

  /** Get people (filtered by searchTerm if not undefined) */

  static async getPeople(data) {
    let res = await this.request("people", data);
    return res.people;
  }
  
  /** Get details on a person by fullname. */

  static async getPerson(fullname) {
    let res = await this.request(`people/${fullname}`);
    return res.person;
  }

  /** Add a new person */ 

  static async addPerson(data) {
    let res = await this.request("people", data, "post");
    return res.person;
  }

  /** Upload a new image */
  static async uploadImage(data) {
    let res = await this.request("images", data, "post");
    return res.image;
  }

  /** Get crew of a image */
  static async getCrew(imageId) {
    let res = await this.request(`images/${imageId}/people`);
    return res.crew;
  }

  /** Add relation work_image */

  static async addWorkImage(workId, imageId) {
    await this.request(`images/${imageId}/works/${workId}`, {}, "post");
  }

  /** Add relation people_image */

  static async addPeopleImage(fullname, imageId) {
    await this.request(`images/${imageId}/people/${fullname}`, {}, "post");
  }

  /** Add favorite artist(people) */

  static async addFavorite(username, artist) {
    await this.request(`users/${username}/people/${artist}`, {}, "post");
  }

  /** Delete favorite artist(people) */

  static async deleteFavorite(username, artist) {
    await this.request(`users/${username}/people/${artist}`, {}, "delete");
  }

  /** Get all favorites */

  static async getFavorites(username) {
    let res = await this.request(`users/${username}/people`);
    return res.favorites;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default ModelmagicaApi;
