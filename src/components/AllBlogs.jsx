import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
//import { useEffect } from "react"
function AllBlogs() {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const [category,setCategory] = useState("Select category");
  const [limit,setLimit] = useState(5)
  const [status,setStatus] = useState("Select status")
  const [page,setPage] = useState(1) //const token = sessionStorage.getItem("token")
  const [totalPages,setTotalPages] = useState(1)
  const [sortingOptions,setSortingOptions] = useState([{title:"asc",createdAt:"asc",Status:"asc"}])
  const [sort,setSort] = useState({part:"",value:"asc"})
  //const [sortingOption]

  const getBlogs = async (category1 = "", status1 = "", limit1 = limit, page1 = page) => {
  try {
    const params = new URLSearchParams();

    if (category1 && category1 !== "Select category") {
      params.append("category", category1);
    }

    if (status1 && status1!=="Select status") {
      params.append("status", status1);
    }

    if (limit1 && category!=="Select category" && status!=="Select status") {
      params.append("limit", limit1);
    }

    if (page1 > 0) {
      params.append("page", page1);
    }

    // if(sortingOptions){
    
    //   sortingOptions.forEach(option=>{
    //     let key = option.key().toString()
    //     let value = option.value()
    //     let res = key+ value
    //     params.append("sortBy",res)})
    // }



    const url = `http://localhost:8002/blog?${params.toString()}`;

    const res = await fetch(url, { credentials: "include" });

    const blogs = await res.json();
    console.log("blog count",blogs.allBlogsCount)
    setTotalPages(Math.ceil(blogs.allBlogsCount/limit1)); 

    setAllBlogs(blogs.blogs);

    console.log("Final URL:", url);
    console.log("Blogs:", blogs.blogs);
  } catch (e) {
    console.log(e);
  }
};

useEffect(() => {
  setPage(1);
}, [category, status, limit]);

  useEffect(() => {
    getBlogs(category,status,limit,page);
  }, [category,status,limit,page]);

  return (
    <div className="all-blogs-bg vh-100 w-100 d-flex flex-column justify-content-center align-items-center gap-2">
      <h1 className="text-white">All Blogs</h1>
       <div className="d-flex gap-2">
      <LogoutBtn />

      <button onClick={() => navigate("/add-blog")} className="btn btn-light">Add Blog</button>
      </div>
      <div className="d-flex gap-2">
      <select name="blog-category" id="blog-category" value={category} onChange={(e)=>setCategory(e.target.value)}>
       <option disabled>Select category</option>
       <option value="Poetry">Poetry</option>
       <option value="Article">Article</option>
       <option value="Story">Story</option>
       <option value="Other">Other</option>
      </select>
      <select name="blog-status" id="blog-status" value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option disabled>Select status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
       <div className="d-flex gap-10"> 
        <div className="d-flex flex-column gap-2">
        <div className="d-flex gap-2">
          <input type="checkbox" name="title" id="title" value="title"/>
         <label htmlFor="title" className="text-white">Title</label>
         </div>
         <select onSelect={(e)=>{setSortingOptions(prev=>({...prev,title:e.target.value}))}}>
            <option disabled>Sorting order</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
         </select>
         </div>
        <div className="d-flex flex-column gap-2">
        <div className="d-flex gap-2">
          <input type="checkbox" name="createdAt" id="createdAt" value="createdAt"/>
          <label htmlFor="createdAt" className="text-white">createdAt</label>
        </div>
         <select onSelect={(e)=>{setSortingOptions(prev=>({...prev,createdAt:e.target.value}))}}>
            <option disabled>Sorting order</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
         </select>
         </div>
          <div className="d-flex flex-column gap-2">
        <div className="d-flex gap-2"> 
            <input type="checkbox" name="Status" id="Status"value="Status"/>
          <label htmlFor="Status" className="text-white">Status</label>
       </div>
         <select onSelect={(e)=>{setSortingOptions(prev=>({...prev,Status:e.target.value}))}}>
            <option disabled>Sorting order</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
         </select>
         </div>
         <button type="submit" onClick={()=>{}} className="btn btn-light">Submit</button>
        </div>
      <table className="table table-responsive table-md">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allBlogs?.map((blog, index) => (
            <tr key={`blog-id-${index}`}>
              <td>{(page-1)*limit+index+1}</td>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>{blog.category}</td>
              <td>{blog.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex gap-2">
        <button onClick={()=>setPage((prev)=>prev-1)} disabled={page<=1?true:false} className="btn btn-light">Prev</button>
        {
          Array.from({length:totalPages},((_,ind)=>(
            <button onClick={()=>setPage(ind+1)} className="btn btn-light">{ind+1}</button>
          )))
        }
        <button onClick={()=>setPage((prev)=>prev+1)} disabled={page>=limit?true:false} className="btn btn-light">Next</button>
      </div>
    </div>
  );
}

export default AllBlogs;
