export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'));
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwic3luZGljYXRlUGFydG5lclR5cGUiOiJnb29nbGVIb21lIiwiYXBpS2V5IjoiYWIyMmI0MDctYWY4Mi00ZmVlLWFlZDItODY1Y2I4OTljODQ1IiwiZGF0YSI6eyJpc1BBVCI6dHJ1ZSwidVJJRCI6MX0sImlhdCI6MTU3MzQ3Nzk0MywiZXhwIjo2MTU3MzQ3Nzk0M30.KEQzEzbJ6Fzhs0W3qBzz08EgftConG8yD-Dd0OaZxU8";
  if (token) {
    return {
      Authorization: "Bearer " + token
    };
  } else {
    return {};
  }
}

export function authHeader2() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'));
  let token = "[!h1s_1$_@_$3cr3t!!]";
  if (token) {
    return {
      Authorization: "Bearer " + token
    };
  } else {
    return {};
  }
}
