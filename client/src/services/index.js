export async function  registerUser(data) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/register/`, {
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
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/login`, {
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
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/`, {
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
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  getPostDetail(postId) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/postId=${postId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  updateViews(postId) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/views/postId=${postId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  getUserPosts(userId) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/userId=${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  deletePost(postId) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/delete/postId=${postId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
         
    })
    const resData = await res.json();
    return resData
}
export async function  editPost(postId,data,token) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/update/postId=${postId}`, {
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

export const handleLike = async (postId,userId,token) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ postId,userId }),
    });
  
    const resData = await response.json();
    return resData
  };
  
  export const addComment = async (postId,data,token) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/comments/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    const resData = await response.json();
    return resData
  };
  
  export const getComment = async (postId) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/comments/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const resData = await response.json();
    return resData
};
export const searchUsers = async (fullname) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users?fullname=${encodeURIComponent(fullname)}`, {
    
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();
  return resData
};