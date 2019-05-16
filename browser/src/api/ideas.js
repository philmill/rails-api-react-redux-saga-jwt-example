import axios from "axios";

class Ideas {
  static requestHeaders() {
    return { Authorization: `Bearer ${sessionStorage.jwt}` };
  }

  static index() {
    return axios
      .get("/api/v1/ideas", { headers: Ideas.requestHeaders() })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static create(idea) {
    return axios
      .post("/api/v1/ideas", { idea }, { headers: Ideas.requestHeaders() })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static update(idea) {
    return axios
      .put(
        `/api/v1/ideas/${idea.id}`,
        { idea },
        { headers: Ideas.requestHeaders() }
      )
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static delete(id) {
    return axios
      .delete(`/api/v1/ideas/${id}`, {
        headers: Ideas.requestHeaders()
      })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export default Ideas;
