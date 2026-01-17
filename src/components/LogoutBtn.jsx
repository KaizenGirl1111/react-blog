import { useNavigate } from "react-router-dom"

function LogoutBtn(){
    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const signOut = async()=>{
        try{
        await fetch(`${BACKEND_URL}/logout`,{
            credentials:"include"
        })
        }
        catch(err){
            console.log("logout error",err)
        }
    }

    return(<>
     <button onClick={()=>{
      //  sessionStorage.clear()
      //  localStorage.clear()
        signOut()
        navigate('/')
    }} className="btn btn-light">Log out</button>
    </>)
}

export default LogoutBtn;