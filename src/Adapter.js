const usersURL = "http://localhost:3000/api/v1/users"
const giftsURL = "http://localhost:3000/api/v1/gifts"

export const test_const = 123


export const signin= (email, password) => {
    return fetch('http://localhost:3000/api/v1/signin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(resp => resp.json())
}


export const validate = () => {
    return fetch('http://localhost:3000/api/v1/validate', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    }).then(resp => resp.json())

}



export const getWishes = () => {
    return fetch('http://localhost:3000/api/v1/get_items', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    }).then(resp => resp.json())
}



export const postGift = (giftObject) => fetch(giftsURL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(giftObject)
}).then(resp => resp.json())

export const updateUserById = (userObject) => fetch(`http://localhost:3000/api/v1/users/${userObject.id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)
}).then(resp => resp.json())

export const postUser = (userObject) => fetch(usersURL, {
    method: 'POST',
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


export const deleteGift = (id) => fetch(`${giftsURL}/${id}`, {
    method: 'DELETE'
}).then(resp => resp.json())


export const getUsersBySearchQuery = (string) => fetch(`${usersURL}/search_user`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ search: string })
}).then(resp => resp.json())