import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate} from "react-router-dom"
import { ChangeEvent, CSSProperties , useState,FormEvent, useContext } from "react"
import { FirebaseContext } from '../../store/fireBaseContext';
import "firebase/auth"
import { FirebaseError } from 'firebase/app';
import { RingLoader } from 'react-spinners';
const override: CSSProperties = {
  display: "block",
  margin: "10px auto",
  borderColor: "blue",
};
export default function Signup() {
  const [loading, setLoading] = useState<boolean>(false)
  const[error, setError] = useState<string>("")
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firebase) {
      setLoading(true)
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
        .then((result: any) => {
          result.user.updateProfile({ displayName: formData.username }).then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: formData.username,
              phone: formData.phone
            }).then(() => {
              setLoading(false)
              navigate('/login');
            });
          }).catch((err) => {
            setLoading(false)
            console.log(err)
          });
        })
        .catch((error: FirebaseError) => {
          setLoading(false)
          setError(error.message)
          console.error(error.message);
        });
    } else {
      console.error("Firebase or Firebase Auth not properly initialized");
    }
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
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
          <br />
          <label htmlFor="lname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="lname"
            name="email"
            value={formData.email}
            onChange={handleChange}
            defaultValue="John"
          />
          <br />
          <label htmlFor="mname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="mname"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="pname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="pname"
            value={formData.password}
            onChange={handleChange}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
    )}
    </>
  );
}
