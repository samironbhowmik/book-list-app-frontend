import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../components/addbook.css"
function AddBook() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setIsbn] = useState("")
    const [publisher, setPublisher] = useState("")
    const [genre, setGenre] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault()
        // console.log("working");
        const res = await axios.post("http://localhost:7000/books", {title:title, author:author, isbn:isbn, publisher:publisher, genre:genre})
        console.log(res);
        navigate("/home")
    }

  return (
    <div>
        <div className="addbook-container">
            <h2 className='book-heading'>Add Book</h2>
            <p id='sub'>Create New Book</p>
            
            <Link to="/home">
            <button className='bookshow-btn'>Show Book List</button>
            </Link>
            <form className='addform'>
                <div className="box">
                    <input type="text" className='inp-box' placeholder='Title of the book' onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                    </div>
                    <div className="box">
                    <input type="text" className='inp-box' placeholder='Author Name'  onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
                    </div>
                    <div className="box">
                    <input type="text" className='inp-box' placeholder='ISBN'  onChange={(e)=>{setIsbn(e.target.value)}} value={isbn}/>
                    </div>
                    <div className="box">
                    <input type="text" className='inp-box' placeholder='Publisher'  onChange={(e)=>{setPublisher(e.target.value)}} value={publisher}/>
                    </div>
                    <div className="box">
                    <input type="text" className='inp-box' placeholder='Genre'  onChange={(e)=>{setGenre(e.target.value)}} value={genre}/>
                    </div>
                    <div className='box'>
                        <button id='submit' onClick={handleSubmit}>Submit</button>
                    </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddBook