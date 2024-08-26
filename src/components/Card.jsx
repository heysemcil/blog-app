import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/Blog";
import { BiSolidComment, BiSolidLike } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Card({ post, prev }) {

  const [enteredComment, setEnteredComment] = useState("")
  const navigate = useNavigate();
  const { deletePost, addComment, addLike } = useBlog();

  const html = (
    <div className={prev && 'line-clamp-1 truncate whitespace-pre-wrap my-3 flex-1'}
     dangerouslySetInnerHTML={{__html:post?.content}}
    > 
      {/* {post?.content} */}

    </div>
  )

  const handleDelete = (id) => {
    deletePost(id, navigate);
  };

  const handleLike = (id) => {
    addLike(id);
  };

  const handleComment = (id) => {
    if(enteredComment.trim().length==0) return toast.error('Please add the comment')
    addComment(id, enteredComment)
    setEnteredComment('');
  };

  return (
    <div className="border border-gray-200 shadow rounded-lg">
      <Link to={`/post/details/${post?.id}`}>
        <img src={post?.image} className="h-[200px] object-cover w-full" />
      </Link>
      <div className="flex flex-col p-5">
        <Link to={`/post/details/${post?.id}`}>
          <h5 className="mb-2 text-2xl font-bold text-center">{post?.title}</h5>
        </Link>
        <div>
          <div className="flex justify-between">
            <p className="font-bold">Published On:</p>
            <p className="italic">
              {new Date(post?.publish_date).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Author:</p>
            <p className="italic">{post?.author}</p>
          </div>
        </div>
        <hr />
        {/* post content */}
        {html}
        <hr />

        <div
          className={`flex space-x-10 pr-3 mt-5 ${
            prev ? "justify-center" : "justify-between"
          }`}
        >
          {/* Delete and Edit */}
          {!prev && (
            <div className="flex space-x-5 my-5">
              <button
                className="btn-danger"
                onClick={() => handleDelete(post?.id)}
              >
                DELETE
              </button>
              <button
                className="btn-warning"
                onClick={() =>
                  navigate(`/post/edit/${post?.id}`, { state: post })
                }
              >
                EDIT
              </button>
            </div>
          )}
          <div className="flex space-x-5 my-5">
            <div className="relative">
              <BiSolidLike
                className="text-2xl text-blue-500 relative cursor-pointer"
                onClick={() => {
                  handleLike(post?.id);
                }}
              />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-500 border-2 border-white text-white rounded-full -top-3 -right-4">
                {post?.likes}
              </div>
            </div>
            <div className="relative">
              <BiSolidComment className="text-2xl text-green-500 relative cursor-pointer" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-500 border-2 border-white text-white rounded-full -top-3 -right-4">
                {post?.comments.length}
              </div>
            </div>
            <div className="relative">
              <BsFillEyeFill className="text-2xl text-gray-500 relative cursor-pointer" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-500 border-2 border-white text-white rounded-full -top-3 -right-4">
                {post?.post_views}
              </div>
            </div>
          </div>
        </div>

        <hr />
        {!prev && post?.comments.length !== 0 && (
          <>
            {post?.comments.map((comment) => (
              <div className="flex justify-between items-center my-10">
                <div className="flex space-x-5">
                  <p>{comment?.user}</p>
                  <p className="font-italic"> {comment?.content}</p>
                </div>
                <p>{new Date(comment?.time_stamp).toLocaleString()}</p>
              </div>
            ))}
          </>
        )}

        {!prev&&post?.comments?.length==0&&(
            <p className="text-center"> No comments add one</p>
        )}

        {!prev&&(
            <div className="flex space-x-2">
                <input type="text" className="form-control" value={enteredComment} onChange={(e)=> setEnteredComment(e.target.value)} />
                <button className="btn-primary" onClick={()=>handleComment(post?.id)}> Add</button>
            </div>
        )}
      </div>
    </div>
  );
}