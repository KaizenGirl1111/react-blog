import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
const ProtectedRouteCookie = ({ children }) => {
  //const navigate = useNavigate()
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const verifyToken = async () => {
    console.log("check verifyToken");
    try {
      let res = await fetch(`${BACKEND_URL}/verify`, {
        credentials: "include",
      });
      let newData = await res.json();
      console.log("newData ", newData);
      if(newData.authenticated===true)setStatus(true)
      else {
      setStatus(false)
    //  window.location.href("/")
    //  console.log(status)
      }
      console.log(status)
    } catch (error) {
      console.log("verification failed", error);
      setStatus(false);
      window.location.href("/");
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     const intervalCbk = () => {
//       verifyToken().then((data) => setStatus(data.authenticated));
//      // !!status && window.location.href("/");
//     };
//     setInterval(() => {
//       intervalCbk();
//     }, 2000);
//   }, []);

useEffect(()=>{
  verifyToken()
  const id = setInterval(verifyToken,5000)
  return ()=>clearInterval(id)
},[])

  if (loading) return <p>Loading & Testing</p>;
  return status ? children : <Navigate to="/" />;

};

export default ProtectedRouteCookie;
