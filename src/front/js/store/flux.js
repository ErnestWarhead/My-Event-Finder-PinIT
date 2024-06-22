const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            email: null,
            location: null,
            user_id: null,
            events: [],
            favorites: [],
            currentIndex: 0,

        },
        actions: {
            newUser: async (email, password, location) => {
                try {
                    const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password, location }),
                    });
                    const data = await resp.json();
                    console.log(`From actions.newUser: ok: ${data.ok}, msg: ${data.msg}`);
                    return data;
                } catch (error) {
                    console.log("From actions.newUser: Error creating new user", error);
                    return { ok: false, msg: "Error creating new user" };
                }
            },  // closing newUser method

            login: async(email, password) => {
                try {
                    const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({email, password}),
                    });
                    const data = await resp.json();
                    if (data.ok) {
                        localStorage.setItem("token", data.payload.access_token);
                        localStorage.setItem("email", data.payload.email);
                        localStorage.setItem("userId", data.payload.user_id);
                        localStorage.setItem("location", data.payload.location);
                        setStore({token: data.payload.access_token});
                        setStore({email: data.payload.email});
                        setStore({user_id: data.payload.user_id});
                        setStore({location: data.payload.location});
                    }
                    console.log(`From actions.login: ok: ${data.ok}, msg: ${data.msg}`);
                    return { ok: data.ok, msg: data.msg };
                } catch (error){
                    console.log("From actions.login: Error logging in", error);
                    return {ok: false, msg: "Error logging in"};
                }
            }, // closing login method

            data: async (action, payload) => {
                const store = getStore();
                const token = localStorage.getItem("token") || store.token;
                let response = { ok: false, msg: "This message was never changed by actions.data", payload: [] };
                if (!token) {
                    return { ok: false, msg: "Not logged in." }
                }
                switch (action) {
                    case "events":
                        if (store.events.length !== 0) {
                            response.payload = store.events;
                            console.log("From actions.data: Events fetched from store");
                            response.msg = "Events fetched from store";
                            response.ok = true;
                            localStorage.setItem("events", JSON.stringify(response.payload));
                        } else if (localStorage.getItem("events")) {
                            response.payload = JSON.parse(localStorage.getItem("events"));
                            console.log("From actions.data: Events fetched from local storage");
                            response.msg = "Events fetched from local storage";
                            response.ok = true;
                            setStore({events: response.payload});
                        } else {
                            console.log("From actions.data: Starting API call for events");
                            try {
                                const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/events", {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${store.token}`
                                    }
                                });
                                const events = await resp.json();
                                if (events.ok) {
                                    response.payload = events.payload;
                                    console.log("From actions.data: Events fetched from API");
                                    response.msg = "Events fetched from API";
                                    response.ok = true;
                                    setStore({events: response.payload});
                                    localStorage.setItem("events", JSON.stringify(response.payload));
                                } else {
                                    console.log(`From actions.data: While fetching events from API: ok: ${events.ok}, msg: ${events.msg}`);
                                    response.msg = events.msg;
                                    response.ok = events.ok;

                                }
                            } catch (error) {
                                console.log("From actions.data: Error fetching events", error);
                                response.msg = "Error fetching events";
                            }
                        }
                        return response;
            
                    case "favorites":
                        if (store.favorites.length !== 0) {
                            response.payload = store.favorites;
                            console.log("From actions.data: Favorites fetched from store");
                            response.msg = "Favorites fetched from store";
                            response.ok = true;
                            localStorage.setItem("favorites", JSON.stringify(response.payload));
                        } else if (localStorage.getItem("favorites")) {
                            response.payload = JSON.parse(localStorage.getItem("favorites"));
                            console.log("From actions.data: Favorites fetched from local storage");
                            response.msg = "Favorites fetched from local storage";
                            response.ok = true;
                            setStore({favorites: response.payload});
                        } else {
                            console.log("From actions.data: Starting API call for favorites");
                            try {
                                const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/favorites", {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${store.token}`
                                    }
                                });
                                const favorites = await resp.json();
                                if (favorites.ok) {
                                    response.payload = favorites.payload;
                                    console.log("From actions.data: Favorites fetched from API");
                                    response.msg = "Favorites fetched from API";
                                    response.ok = true;
                                    setStore({favorites: response.payload});
                                    localStorage.setItem("favorites", JSON.stringify(response.payload));
                                } else {
                                    console.log(`From actions.data: While fetching favorites from API: ok: ${favorites.ok}, msg: ${favorites.msg}`);
                                    response.msg = favorites.msg;
                                    response.ok = favorites.ok;
                                }
                            } catch (error) {
                                console.log("From actions.data: Error fetching favorites", error);
                                response.msg = "Error fetching favorites";
                            }
                        }
                        return response;
            
                    case "add":
                        try {
                            let text = payload;
                            if(payload.description) {
                                let place = -1;
                                for(let i = 0; i < text.description.length && i < 250; i++) {
                                  if (text.description[i] === ".") {
                                    place = i;
                                  }
                                }
                                text.description = place === -1 ? text.description.slice(0, 250) : text.description.slice(0, place + 1);
                              }
                            const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/favorites", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${store.token}`
                                },
                                body: JSON.stringify(text)
                            });
                            const favorites = await resp.json();
                            if (favorites.ok) {
                                response.payload = favorites.payload;
                                console.log("From actions.data: Favorite added and fetched from API");
                                response.msg = "Favorite added successfully";
                                    response.ok = true;
                                    setStore({favorites: response.payload});
                                    localStorage.setItem("favorites", JSON.stringify(response.payload));
                            } else {
                                console.log(`From actions.data: There was an issue adding favorite: ok: ${favorites.ok}, msg:${favorites.msg}`);
                                response.msg = favorites.msg;
                                response.ok = favorites.ok;
                            }
                        } catch (error) {
                            console.log("From actions.data: Error adding favorite", error);
                            response.msg = "Error adding favorite";
                        }
                        return response;
            
                    case "delete":
                        try {
                            const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/favorites/${payload.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${store.token}`
                                }
                            });
                            const favorites = await resp.json();
                            if (favorites.ok) {
                                response.payload = favorites.payload;
                                console.log("From actions.data: Favorite deleted and fetched from API");
                                response.msg = "Favorite deleted successfully";
                                    response.ok = true;
                                    setStore({favorites: response.payload});
                                    localStorage.setItem("favorites", JSON.stringify(response.payload));
                            } else {
                                console.log(`From actions.data: There was an issue deleting favorite: ok: ${favorites.ok}, msg:${favorites.msg}`);
                                response.msg = favorites.msg;
                                response.ok = favorites.ok;
                            }
                        } catch (error) {
                            console.log("From actions.data: Error deleting favorite", error);
                            response.msg = "Error deleting favorite";
                        }
                        return response;
            
                    default:
                        console.log("From actions.data: Unknown action type");
                        return response;
                }
            },  // closing data method

            changeLocation: async (location) => {
                console.log(`From actions.changeLocation: this is the location sent:`)
                console.log(`${location.lat}`)
                console.log(`${location.lng}`)
                console.log(`${location.location}`)
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${store.token}`
                        },
                        body: JSON.stringify({
                            location: location.location,
                            lat: location.lat,
                            lng: location.lng
                        })
                    });
                    const data = await resp.json();
                    if (data.ok) {
                        setStore({ location: location.location });
                        setStore({events: []});
                        localStorage.setItem("location", location.location);
                        localStorage.removeItem("events");
                        console.log("From actions.changeLocation: Location updated successfully to: " + location.location);
                        getActions().data("events")
                        return { ok: true, msg: data.msg };
                    } else {
                        console.log(`From actions.changeLocation: Error updating location: ${data.msg}`);
                        return { ok: false, msg: data.msg };
                    }
                } catch (error) {
                    console.log("From actions.changeLocation: Error updating location", error);
                    return { ok: false, msg: "Error updating location" };
                }
            },

            forgotPassword: async (email) => {
                try {
                    const resp = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/forgot-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.log("From actions.forgotPassword: Error requesting the password change email", error);
                    return { ok: false, msg: "Error requesting email" };
                }
            },  // closing forgotPassword method

            swipe: (action, event) => {
                const actions = getActions();
                const store = getStore();                
                if (action === "right" || action === "left") {
                    if (action === "right") {
                        actions.data("add", event);
                    }                    
                    setStore({ currentIndex: store.currentIndex + 1 });
                    localStorage.setItem("currentIndex", store.currentIndex + 1)
                }
                if (action === "undo"){
                    const newIndex = store.currentIndex - 1;
                    setStore({ currentIndex: Math.max(newIndex, 0) });
                    localStorage.setItem("currentIndex", Math.max(newIndex, 0))
                }
            },  // closing swipe method

            logout: () => {
                setStore({
                    token: null,
                    email: null,
                    location: null,
                    user_id: null,
                    events: [],
                    favorites: [],
                    currentIndex: 0,
                });
                localStorage.removeItem("token")
                localStorage.removeItem("email")
                localStorage.removeItem("location")
                localStorage.removeItem("userId")
                localStorage.removeItem("events")
                localStorage.removeItem("favorites")
                localStorage.removeItem("currentIndex")
            },  // closing logout method

            setup: () => {
                console.log("From actions.setup: running");
            
                const token = localStorage.getItem("token");
                if (token) {
                    setStore({ token });
                    console.log("From actions.setup: token set from local storage");
                }
            
                const email = localStorage.getItem("email");
                if (email) {
                    setStore({ email: email });
                    console.log("From actions.setup: email set from local storage");
                }
            
                const location = localStorage.getItem("location");
                if (location) {
                    setStore({ location: location });
                    console.log("From actions.setup: location set from local storage");
                }
            
                const userId = localStorage.getItem("userId");
                if (userId) {
                    setStore({ user_id: userId });
                    console.log("From actions.setup: userId set from local storage");
                }
            
                const events = localStorage.getItem("events");
                if (events) {
                    setStore({ events: JSON.parse(events) });
                    console.log("From actions.setup: events set from local storage");
                }
            
                const favorites = localStorage.getItem("favorites");
                if (favorites) {
                    setStore({ favorites: JSON.parse(favorites) });
                    console.log("From actions.setup: favorites set from local storage");
                }
            
                const currentIndex = parseInt(localStorage.getItem("currentIndex"), 10);
                if (currentIndex) {
                    setStore({ currentIndex: currentIndex });
                    console.log(`From actions.setup: currentIndex: ${currentIndex} set from local storage`);
                }
            },  // closing setup method

        }  // closing actions object
    };  // closing return object
};  // closing getState function

export default getState;