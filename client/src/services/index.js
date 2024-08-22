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