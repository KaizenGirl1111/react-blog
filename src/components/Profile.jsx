import { useState } from "react";

function Profile(){
  const [status,setStatus] = useState("")
  const getProfile = async()=>{
    await fetch("http://localhost:8002/me",{
        credentials:"include"
    })
  }
    return(<>
       
    </>)
}

export default Profile;