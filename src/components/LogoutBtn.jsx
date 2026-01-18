import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

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
     <Button onClick={()=>{
      //  sessionStorage.clear()
      //  localStorage.clear()
        signOut()
        navigate('/')
    }} variant="light" size="sm">Log out</Button>
    </>)
}

export default LogoutBtn;