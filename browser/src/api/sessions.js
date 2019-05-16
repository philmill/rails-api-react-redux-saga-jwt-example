import axios from "axios";

class Sessions {
  static login(credentials) {
    return axios
      .post("/api/v1/login", { auth: credentials })
      .then(response => sessionStorage.setItem("jwt", response.data.jwt));
  }

  static logout() {
    return sessionStorage.removeItem("jwt");
  }
}

export default Sessions;
