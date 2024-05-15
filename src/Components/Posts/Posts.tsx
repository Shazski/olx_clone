import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import Heart from '../../assets/Heart';
import './Post.css';
import { AuthContext, FirebaseContext } from '../../store/fireBaseContext';
import { PostContext } from "../../store/postContext"
function Posts() {
  
  const navigate = useNavigate()
  const [products, setProducts] = useState<[]>([])
  console.log(products,"my id product that i need to work")
  const { user } = useContext(AuthContext)
 
  const { firebase } = useContext(FirebaseContext)
  const { setPostDetails } = useContext(PostContext)
  useEffect(() => {
    firebase.firestore().collection("products").limit(6).get().then((snap) => {
      const allPost = snap.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((value, index) => (
            <div key={index}
              className="card"
              onClick={() => {
                setPostDetails(value)
                navigate(`/view?productId=${value.name}`)
              } 
              }
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={value.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {value?.price}</p>
                <span className="kilometer">{value?.category}</span>
                <p className="name"> {value.name}</p>
              </div>
              <div className="date">
                <span>{value.createdAt}</span>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        {products.map((value, index) => (
          <div key={index}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={value.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {value?.price}</p>
              <span className="kilometer">{value?.category}</span>
              <p className="name"> {value.name}</p>
            </div>
            <div className="date">
              <span>{value.createdAt}</span>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Posts;
