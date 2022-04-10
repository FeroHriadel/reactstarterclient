import cookie from 'js-cookie'; //also run: $ npm i --save-dev @types/js-cookie to get types
import { UserDetails } from '../context/userContext'; //UserDetails model import




//HELPERS (get and set user in LS and token in cookies)
  //set cookie
export const setCookie = (key: string, value: string) => {
    cookie.set(key, value);
}

 //get cookie
export const getCookie: (key: string) => string | undefined = (key) => {
    return cookie.get(key);
}

  //remove cookie
export const removeCookie = (key: string) => {
    cookie.remove(key);
}

  //save user in LS & token in cookies
export const saveUserAndToken = (user: UserDetails, token: string) => {
    setCookie('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

  //remove user from LS & token from cookies
export const removeUserAndToken = () => {
    removeCookie('token');
    localStorage.removeItem('user');
}

  //get user from LS & token from cookies
export const getUserAndToken: () => {user: {email: string; _id: string; role: string}, token: string | undefined} | undefined = () => {
    const isCookie = getCookie('token');
    if (isCookie) {
        if (localStorage.getItem('user')) {
            return {
                user: {...JSON.parse(localStorage.getItem('user')!)},
                token: getCookie('token')
            }
        }
    } else return undefined;
}



//API CALLS:
//
//SIGNUP
interface EmailPasswordValues {
    email: string;
    password: string;
}

export const signup = (values: EmailPasswordValues) => {
    return fetch(`${process.env.REACT_APP_API}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return res.json();
    })
    .catch(error => {
        return {error: 'Something went wrong (action)'}
    })
}



//SIGNIN
export const signin = (values: EmailPasswordValues) => {
    return fetch(`${process.env.REACT_APP_API}/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        return res.json()
    })
    .catch(error => {
        return {error: 'Something went wrong (action)'}
    })
}



//GET LOGGED-IN USER INFO
export const getLoggedInUser = (token: string) => {
    return fetch(`${process.env.REACT_APP_API}/users/getuser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(error => {
        return {error: 'Something went wrong (action)'}
    })
}
