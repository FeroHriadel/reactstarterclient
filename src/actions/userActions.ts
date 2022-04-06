

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