import React from 'react'
import Post from './features/posts/Post'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './layout/Home'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/posts" element={<Post></Post>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
   
  )
}

export default App