import { useNavigate } from "react-router-dom"

function LogoutBtn(){
    const navigate = useNavigate()
    const signOut = async()=>{
        try{
        await fetch("http://localhost:8002/logout",{
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