import {useState, ChangeEvent, FormEvent, useContext, CSSProperties} from 'react';
import { Link, useNavigate} from "react-router-dom"
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/fireBaseContext';
import { FirestoreError } from 'firebase/firestore';
import { RingLoader } from 'react-spinners';
function Login() {
  const navigate = useNavigate()
  const[error, setError] = useState<string>("")
  const {firebase} = useContext(FirebaseContext)
  const [formData, setFormData] = useState<{
    email:string,
    password:string
  }>({
    email:"",
    password:""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget
    setFormData({
      ...formData,[name]:value
    })
  }
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(formData.email,formData.password).then(() => {
      setLoading(false)
      navigate('/')
    }).catch((err:FirestoreError) => {
      setLoading(false)
      setError("invalid Details")
      console.log(err.message)
    })
  }
  const override: CSSProperties = {
    display: "block",
    margin: "10px auto",
    borderColor: "blue",
  };
  return (
    <>
    {loading ? (
      <RingLoader
      loading={loading}
      cssOverride={override}
      color='#36d7b7'
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    ):(
      <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error ? <><p>{error}</p></>:""}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={handleChange}
            value={formData.email}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={handleChange}
            value={formData.password}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
    )}
    </>
  );
}

export default Login;
