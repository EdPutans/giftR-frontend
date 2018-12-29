const localhost = "http://192.168.1.31:3000"
// const localhost = "http://localhost:3000"

const API_v1 = `${localhost}/api/v1`
const signinURL = `${localhost}/api/v1/signin`
const validateURL = `${localhost}/api/v1/validate`
const usersURL = `${localhost}/api/v1/users`
const giftsURL = `${localhost}/api/v1/gifts`
const friendshipsURL = `${localhost}/api/v1/friendships`
export const test_const = 123

export const signin= (email, password) => {
    return fetch(signinURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(resp => resp.json())
}


export const validate = () => {
    return fetch(validateURL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    }).then(resp => resp.json()).catch(e=>console.log(e))

}
// ------------- friend and related ----------- //

export const friendRequest=(user_id, friend_id)=>{
    return fetch(`${friendshipsURL}/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id, friend_id
        })
    }).then(r=>r.json())
}

export const acceptOrRejectFriendRequest = (friendship_id, string) => {
    let updateStatus = {}
    if (string === 'confirmed') {
        updateStatus = { confirmed: true }
    } else if (string === 'rejected') {
        updateStatus = { rejected: true }
    }
    return fetch(`${friendshipsURL}/${friendship_id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            ...updateStatus
        })
}).then(r => r.json())
}


// export const acceptOrRejectFriendRequest = (currentUser_id, friend_id, string)=>{
//     let updateStatus = {}
//     if(string==='confirmed'){
//         updateStatus = { confirmed: true } 
//     }else if(string==='rejected'){
//         updateStatus = { rejected: true }
//     }
// // this function reverses the friend id and current user id, since the user is a friend who replies to the request, so currentuser = friend.
//     return fetch(`${friendshipsURL}/confirm_or_reject`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
            
//         }
//         )
//     }).then(r => r.json())
// }

export const getFriends = (id) => {
    return fetch(`${usersURL}/${id}/friends`)
        .then(r => r.json())
}

export const getUnaccepted = (currentUserId) => {
    return fetch(`${friendshipsURL}/${currentUserId}/unaccepted`)
        .then(r => r.json())
}
export const getUnacceptedIds = (currentUserId) => {
    return fetch(`${friendshipsURL}/${currentUserId}/unaccepted_ids`)
        .then(r => r.json())
}
export const getActiveRequestIds = (currentUserId) => {
    return fetch(`${friendshipsURL}/${currentUserId}/active_request_ids`)
        .then(r => r.json())
}



//  ----------- gifts / wishes -------------- //



export const getWishes = () => {
    return fetch(`${API_v1}/get_items`, {
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


// ------------------ user stuff -------------//

export const updateUserById = (userObject) => fetch(`${usersURL}/${userObject.id}`, {
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


export const getUsersBySearchQuery = (string) => fetch(`${usersURL}/search_user`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ search: string })
}).then(resp => resp.json())