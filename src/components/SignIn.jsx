import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function SignIn() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginWith, setLoginWith] = useState({ phone: false, email: false });
  const [phone,setPhone] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    console.log("form submitted", formData);
    signInUser(formData);

  };

  const signInUser = async (formData) => {
    try{
    let res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    let newData = await res.json();
    console.log("newData",newData);
   // if(newData.token){
     // sessionStorage.setItem("token",newData.token)
    //  localStorage.setItem("token",newData.token)
    //  localStorage.setItem("cat","tom")
   // }
    if(typeof newData==="object") navigate('/all-blogs')
}
catch(error){
    console.log(error)
}
  };
  //style={{backgroundImage:`url("https://images6.alphacoders.com/585/thumb-1920-585940.png")`}}
  return (
    <>
    <div className="sign-in d-flex flex-column justify-content-center align-items-center gap-5" style={{backgroundImage:`url("https://images6.alphacoders.com/585/thumb-1920-585940.png")`}}>
    <div className="d-flex gap-5">
      <Button
        onClick={() => setLoginWith({email:false, phone: true })}
        className="text-white"
      >
        Login with phone
     </Button>
      <Button className="text-white"
        onClick={() => {setLoginWith({phone:false, email: true }); console.log("button click")}}
      >
        Login with email
      </Button>
      </div>
      <form onSubmit={handleSubmit} className="text-white">
        {loginWith.email && (
          <div className="d-flex gap-3">
            <input
              type="email"
              name="email"
              id="1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white border border-2 border-primary" 
            />
            <input
              type="password"
              name=""
              id="2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" name="submit" className="btn btn-primary"/>
          </div>
        )}
        {loginWith.phone && (
          <div className="d-flex gap-3">
            <input type="number" name="phone" id="phone" placeholder="Enter phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <input
              type="password"
              name=""
              id="2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" name="submit" className="btn btn-primary" />
          </div>
        )}
      </form>
      </div>
      </>
  );
}

export default SignIn;
