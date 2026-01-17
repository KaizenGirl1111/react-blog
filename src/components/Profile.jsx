import { useState } from "react";

function Profile(){
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [status,setStatus] = useState("")
  const getProfile = async()=>{
    await fetch(`${BACKEND_URL}/me`,{
        credentials:"include"
    })
  }
    return(<>
       
    </>)
}

export default Profile;