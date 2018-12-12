const usersURL = "http://localhost:3000/api/v1/users"
const giftsURL = "http://localhost:3000/api/v1/gifts"

export const e = 123


// Getters
export const getUsers = () => fetch(usersURL).then(resp=> resp.json())

export const getGifts = () => fetch(giftsURL).then(resp => resp.json())


// Posters
export const postUser = (userObject) => fetch(usersURL,{
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)
}).then(resp => resp.json())

export const postGift = (giftObject) => fetch(giftsURL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(giftObject)
}).then(resp => resp.json())


// Patchers
export const patchUser = (userObject) => fetch(`${usersURL}/${userObject.id}`,{
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)
}).then(resp => resp.json())

export const patchGift = (giftObject) => fetch(`${giftsURL}/${giftObject.id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(giftObject)
}).then(resp => resp.json())

// Deleters
export const deleteUser = (id) => fetch(`${usersURL}/${id}`, {
    method: 'DELETE'
}).then(resp => resp.json())

export const deleteGift = (id) => fetch(`${giftsURL}/${id}`, {
    method: 'DELETE'
}).then(resp => resp.json())