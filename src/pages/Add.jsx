import React from 'react'
import Layout from '../components/Layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/Blog'
import { object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function Add() {
  const navigate = useNavigate()
  const {state} = useLocation()
  const {createPost, updatePost} = useBlog()
  let post;

  if(state){
    post={title: state.title, content: state.content, image: state.image}
  }

  const initialValues = post?post:{title:'', content:'', image:''}

  const handleSubmit = (values)=>{
    if(!post){
      createPost(values, navigate)
    }else{
      updatePost(values, navigate, state.id)
    }
  }

  return (
    <Layout>
      <div className="w-full mx-auto p-6 max-w-[450px] md:max-w-[900px] bg-white border border-gray-200 rounded-lg shadow">
        <h2 className='text-2xl text-center text-gray-800 mb-8'> {post?'EDIT':'ADD'} POST </h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({errors, touched, setFieldValue})=>(
          <Form>
            <div className="my-4">
              <label htmlFor="title" className='form-label'> Post Title:</label>
              <Field
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="NYC Best Attractions"
              />
            </div>

            <div className="my-4">
            <label htmlFor="content" className='form-label'> Post Content:</label>
      
              <CKEditor editor={ClassicEditor} name="content" data={post? post?.content:''} onChange={(event, editor)=>{
                const data = editor.getData()
                setFieldValue("content", data)
              }}/>
            </div>
            <div className="my-4">
            <label htmlFor="image" className='form-label'> Post Image:</label>
            <Field
                type="url"
                name="image"
                id="image"
                className="form-control"
                placeholder="https://image.com"
              />
            </div>

            <div className="my-4 flex justify-center">
              <button className='btn-primary' type='submit'> {post? 'EDIT': 'ADD'}</button>
            </div>
          </Form>
        )}
        </Formik>
      </div>
    </Layout>
  )
}