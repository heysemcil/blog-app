import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useBlog } from '../context/Blog'
import Card from '../components/Card'

export default function Details() {

  const { id}= useParams()

  const {getPost, currentPost}= useBlog()

  useEffect(()=>{
    getPost(id)
  }, [])
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto">
        <Card post={currentPost} prev={false}/>
      </div>
    </Layout>
  )
}