function BlogFilters({category,
  status,
  limit,
  sortBy,
  order,
  setCategory,
  setStatus,
  setLimit,
  setSortBy,
  setOrder}){
return(
    <>
     <div className="d-flex gap-2">
      {/*Category*/}
      <select name="blog-category" id="blog-category" value={category} onChange={(e)=>setCategory(e.target.value)}>
       <option disabled>Select category</option>
       <option value="Poetry">Poetry</option>
       <option value="Article">Article</option>
       <option value="Story">Story</option>
       <option value="Other">Other</option>
      </select>
      {/*Status*/}
      <select name="blog-status" id="blog-status" value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option disabled>Select status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={limit} onChange={(e)=>{setLimit(Number(e.target.value))}}>
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option></option>
      </select>

       {/*sortBy*/}
          <select value={sortBy} onChange={(e)=>{
             setSortBy(e.target.value)
             setOrder("asc")
          }}>
            <option value="" disabled>Sort By</option>
            <option value="title">Title</option>
            <option value="createdAt">Created date</option>
            <option value="status">Status</option>
          </select>

       {/*order*/}
  
         <select value={order} onChange={(e)=>{setOrder(e.target.value)}}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
         </select>
          </div>
         </>
)
}

export default BlogFilters;