import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate()
    return(
        <div style={{display:"flex",gap:"10px"}}>
         <button onClick={()=>navigate('/login')}>Log in</button>
         <button onClick={()=>navigate('/signup')}>Sign up</button>
        </div>
        
    )
}

export default Home;