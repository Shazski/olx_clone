import React, { Fragment, useContext, useState } from 'react';
import {useNavigate}  from  "react-router-dom"
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/fireBaseContext';

const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [image, setImage] = useState<File>()
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const date = new Date().toDateString()
  const handleSubmit = (e) => {
    if(!user) {
     return navigate('/login')
    }
    e.preventDefault()
     firebase.storage().ref(`/image/${image?.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then((url:string) => {
        firebase.firestore().collection("products").add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date
        })
        navigate('/')
      })
     })
  }
  return (
    <Fragment>
      <Header />

        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e) => setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):""}></img>
          <form>
            <br />
            <input onChange={(e) => e.target.files ? setImage(e.target?.files[0]):""} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>

    </Fragment>
  );
};

export default Create;
