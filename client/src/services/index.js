export async function  registerUser(data) {
    const res = await fetch('http://localhost:3000/api/users/register/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
    })
    const resData = await res.json();
    return resData
}
export async function  loginUser(data) {
    const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
    })
    const resData = await res.json();
    return resData
}
export async function  createNewPost(data,token) {
    const res = await fetch('http://localhost:3000/api/posts/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
    })
    const resData = await res.json();
    return resData
}