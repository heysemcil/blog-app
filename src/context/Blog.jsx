import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const BlogContext = createContext({
  getPost: () => {},
  getPosts: () => {},
  createPost: () => {},
  addComment: () => {},
  deletePost: () => {},
  addLike: () => {},
  updatePost: () => {},
  currentPost: {},
  posts: [],
});

export const BlogProvider = ({ children }) => {
  const [currentPost, setCurrentPost] = useState(null);
  const [posts, setPosts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;;

  // Get all posts
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/blogs/`);
      setPosts(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Get a single post
  const getPost = async (id) => {
    let token = JSON.parse(localStorage.getItem("user")).key;

    try {
      const { data } = await axios.get(`${baseUrl}/api/blogs/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCurrentPost(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Create Post
  const createPost = async (data, navigate) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try {
      // const formdata = new FormData();
      // formdata.append("title", data.title);
      // formdata.append("content", data.content);
      // if (data.image) formdata.append("image", data.image, data.image.name);

      data.category = 1;
      data.status = 'p';
      await axios({
        method: "POST",
        url: `${baseUrl}/api/blogs/`,
        data: data,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success('Post created successfully !')
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Add a comment to a post
  const addComment = async (id, content) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try{
      const {data}  = await axios({
        method:'POST',
        url:`${baseUrl}/api/comments/${id}/`, 
        data:{post:id, content},
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      const updatedPost = {...currentPost}


      updatedPost.comments.push(data)
      setCurrentPost(updatedPost)
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  };
  // Delete a post using its id
  const deletePost = async (id, navigate) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try{
      await axios({
        method:'DELETE',
        url:`${baseUrl}/api/blogs/${id}/`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      toast.success('Post deleted Successfully!')

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  };
  // Add a like to a post
  const addLike = async (id) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try{
      const res = await axios({
        method:'POST',
        url:`${baseUrl}/api/likes/${id}/`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(res)
      getPosts()

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  };
  // update a post using its id
  const updatePost = async (data, navigate, id) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try {
  
      await axios({
        method: "PUT",
        url: `${baseUrl}/api/blogs/${id}/`,
        data: data,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success('Post updated successfully !')
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    getPost,
    getPosts,
    createPost,
    addComment,
    deletePost,
    addLike,
    updatePost,
    currentPost,
    posts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => useContext(BlogContext);