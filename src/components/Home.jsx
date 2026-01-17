import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate()
    return(
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center gap-3" style={{backgroundImage:`url("https://images6.alphacoders.com/585/thumb-1920-585940.png")`}}>
         <button onClick={()=>navigate('/login')} className="btn btn-primary">Log in</button>
         <button onClick={()=>navigate('/signup')} className="btn btn-primary">Sign up</button>
        </div>
        
    )
}

export default Home;