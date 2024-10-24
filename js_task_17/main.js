async function fetchUsersWithPosts() {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users'; 
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId='; 
  
    try {
      const usersResponse = await fetch(usersUrl); 
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users'); 
      }
      const users = await usersResponse.json(); 
  
      const usersWithPosts = await Promise.all(
        users.map(async (user) => { 
          const postsResponse = await fetch(`${postsUrl}${user.id}`); 
          if (!postsResponse.ok) {
            throw new Error(`Failed to fetch posts for user ${user.id}`); 
          }
          const posts = await postsResponse.json(); 
          
          const postTitles = posts.map(post => post.title); 
  
          return {
            id: user.id,
            name: user.name,
            posts: postTitles,
          };
        })
      );
  
      return usersWithPosts; 
  
    } catch (error) {
      return Promise.reject(`Error: ${error.message}`);
    }
  }
  
  fetchUsersWithPosts()
    .then(data => console.log(data)) 
    .catch(err => console.error(err)); 
  