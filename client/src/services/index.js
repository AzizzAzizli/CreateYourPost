export async function  registerUser(data) {
    const res = await fetch('https://create-your-post-cjiw.vercel.app/api/users/register/', {
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
    const res = await fetch('https://create-your-post-cjiw.vercel.app/api/users/login', {
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
    const res = await fetch('https://create-your-post-cjiw.vercel.app/api/posts/', {
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
export async function  getAllPosts() {
    const res = await fetch('https://create-your-post-cjiw.vercel.app/api/posts/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  getPostDetail(postId) {
    const res = await fetch(`https://create-your-post-cjiw.vercel.app/api/posts/postId=${postId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  updateViews(postId) {
    const res = await fetch(`https://create-your-post-cjiw.vercel.app/api/post/views/postId=${postId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  getUserPosts(userId) {
    const res = await fetch(`https://create-your-post-cjiw.vercel.app/api/posts/userId=${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  deletePost(postId) {
    const res = await fetch(`https://create-your-post-cjiw.vercel.app/api/post/delete/postId=${postId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  editPost(postId,data,token) {
    const res = await fetch(`https://create-your-post-cjiw.vercel.app/api/post/update/postId=${postId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
    })
    const resData = await res.json();
    return resData
}