const tmdbReadAccessToken = import.meta.env
  .VITE_REACT_APP_TMDB_READ_ACCESS_TOKEN;

export const fetchTokenOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbReadAccessToken}`,
  },
};

export async function fetchToken() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      fetchTokenOptions
    );

    const data = await res.json();

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem("request_token", token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
      // window.location.href = `https://www.themoviedb.org/authenticate/${token}`;
    }
  } catch (error) {
    console.log("Sorry, your token could not be created.");
  }
}

export async function createSessionId() {
  const token = localStorage.getItem("request_token");

  if (token) {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/authentication/session/new",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${tmdbReadAccessToken}`,
          },
          body: JSON.stringify({ request_token: token }),
        }
      );

      const { session_id } = await res.json();

      localStorage.setItem("session_id", session_id);

      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
}
