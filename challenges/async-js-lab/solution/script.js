function getUser(username) {
    return fetch("https://api.github.com/users/" + username)
        .then((response) => {
            if(!response.ok) {
                throw new Error("Request failed with " + response.status)
            }
            return response.json()
})
}

getUser("samkolache")
  .then((user) => console.log("got:", user))
  .catch((error) => console.log("Failed",  error.message));

getUser("this-user-should-not-exist-9f3k2")
  .then((user) => console.log("got:", user))
  .catch((error) => console.log("Failed",  error.message));

