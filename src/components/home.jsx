import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import("../components/home.css");

function Home() {

    const navigate = useNavigate()
  const [data, setData] = useState();
  const [isUpdating, setIsUpdating] = useState("");
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [publisher, setPublisher] = useState("")
  const [genre, setGenre] = useState("")

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://booklist-b8gz.onrender.com/books");
    console.log(res.data.book);
    setData(res.data.book);
  };

  const handleDelete = async(id)=>{
    const res = await axios.delete(`https://booklist-b8gz.onrender.com/books/${id}`)
    console.log(res.data);

    const newList = data.filter((item)=> item._id !==id)
    setData(newList)
}

const update = async (e) => {
    e.preventDefault();
    const res = await axios.put(`https://booklist-b8gz.onrender.com/books/${isUpdating}`, {
      title,
      author,
      isbn,
      publisher,
      genre,
    });
    console.log(res);
    setIsUpdating("");
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublisher("");
    setGenre("");
    getData();
  };


  

  const renderEditForm = () => {
    return (
        <div>
            <h2 className="edit-head">Edit Book</h2>
            <p id="sub-head">Update Book Info</p>
        <form className="render-form">
            <div className="box">
                <input type="text" className="render-inp"  placeholder='Title of the book' onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
            </div>
            <div className="box">
                <input type="text" className="render-inp" placeholder='Author Name' onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
            </div>
            <div className="box">
                <input type="text" className="render-inp" placeholder='ISBN' onChange={(e)=>{setIsbn(e.target.value)}} value={isbn}/>
            </div>
            <div className="box">
                <input type="text" className="render-inp" placeholder='Publisher' onChange={(e)=>{setPublisher(e.target.value)}} value={publisher}/>
            </div>
            <div className="box">
                <input type="text" className="render-inp" placeholder='Genre' onChange={(e)=>{setGenre(e.target.value)}} value={genre}/>
            </div>
            <div className="box">
                <button className="edit-button" onClick={(e)=>{update(e)}}>Update Book</button>
            </div>
    </form>
    </div>
    );
  };

  const handleLogout= async(e)=>{
    e.preventDefault()
    // console.log("working");
    const res = await axios.get("https://booklist-b8gz.onrender.com/logout")
    console.log(res);

    if(res.data.status==="success")
    {
        sessionStorage.removeItem("token, res.data.token")
        navigate("/")
    }
  }

  return (
    <div>
        
      <div className="book-container">

<div className="heads">
        <div className="left">
        <h2 className="header">Book List</h2>
        <div>
          <Link to="/addbook">
            <button>Add New Book</button>
          </Link>
        </div>
        </div>

        <div className="right">
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
        </div>


        <div className="showdata">
          {data?.map((item, id) => {
            return (
              <div className="showbooks" key={id}>
                {
                    isUpdating === item._id
                    ?renderEditForm()
                    :<>                
                <h2>Title: {item.title}</h2>
                <p><strong> Authone Name: </strong>{item.author}</p>
                <p><strong> ISBN: </strong>{item.isbn}</p>
                <p><strong> Publisher:</strong> {item.publisher}</p>
                <p><strong> Genre:</strong> {item.genre}</p>

                <div className="buttons">
                        <button className="update" onClick={()=>{setIsUpdating(item._id)}}>Edit Book</button>
                        <button className="delete" onClick={()=>{handleDelete(item._id)}}>Delete Book</button>
                </div>
                </>
          }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
