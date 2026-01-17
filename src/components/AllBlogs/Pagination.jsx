function Pagination({page,setPage,totalPages}){
return(

      <div className="d-flex gap-2">
        <button onClick={()=>setPage((prev)=>prev-1)} disabled={page<=1}  className={`btn ${page <= 1 ? "btn-light" : "btn-dark"}`}>Prev</button>
        {
          Array.from({length:totalPages},((_,ind)=>(
            <button onClick={()=>setPage(ind+1)} className="btn btn-light">{ind+1}</button> //add btn-light and darl
          )))
        }
        <button onClick={()=>setPage((prev)=>prev+1)} disabled={page==totalPages} className="btn btn-light">Next</button>
      </div>

)
}

export default Pagination