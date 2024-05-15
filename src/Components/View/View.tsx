import React,{useContext, useEffect, useState} from 'react';
import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/fireBaseContext';
import { useSearchParams } from "react-router-dom"
function View() {
  const [userDetails, setUserDetails] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  const [searchQuery, setSearchQuery] = useSearchParams()
 const proId = searchQuery.get("productId")
 console.log(proId)
  useEffect(() => { 
    let userId 
    firebase.firestore().collection("products").where("name","==", proId).get().then((response) => {
      response.forEach(doc => {
        setProductDetails(doc.data())
        userId = doc.data().userId
        firebase.firestore().collection("users").where("id","==",userId).get().then((res) => {
          res.forEach(doc => {
            setUserDetails(doc.data())
          })
        })
      })
    })
  }, [])
  const { username, phone } = userDetails
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails?.url}
          alt="ds"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{productDetails?.price}</p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>{productDetails.createdAt}</span>
        </div>
       { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{username}</p>
          <p>{phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
