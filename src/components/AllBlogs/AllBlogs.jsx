import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoutBtn from "../LogoutBtn";
import BlogFilters from "./BlogFilters";
import BlogTable from "./BlogTable";
import Pagination from "./Pagination";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AllBlogs() {
  const navigate = useNavigate();
  //data
  const [allBlogs, setAllBlogs] = useState([]);

  //filters
  const [category, setCategory] = useState("Select category");
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("Select status");

  //pagination
  const [page, setPage] = useState(1); //const token = sessionStorage.getItem("token")
  const [totalPages, setTotalPages] = useState(1);

  //sorting
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const getBlogs = async () => {
    try {
      const params = new URLSearchParams();

      if (category!=="Select category") {
        params.append("category", category);
      }

      if (status!=="Select status") {
        params.append("status", status);
      }

      params.append("limit",limit);
      params.append("page",page);

      if (sortBy) {
        params.append("sortBy",sortBy);
        params.append("order",order);
      }

      // if(sortingOptions){

      //   sortingOptions.forEach(option=>{
      //     let key = option.key().toString()
      //     let value = option.value()
      //     let res = key+ value
      //     params.append("sortBy",res)})
      // }

      const url = `${BACKEND_URL}/blog?${params.toString()}`;
      console.log("url",url)

      const res = await fetch(url, { credentials: "include" });

      const data = await res.json();
      console.log("blog count", data.allBlogsCount);
      setTotalPages(Math.ceil(data.allBlogsCount / limit));

      setAllBlogs(data.blogs);

      console.log("Final URL:", url);
      console.log("Blogs:", data.blogs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [category, status, limit, sortBy, order]);

  useEffect(() => {
    getBlogs();
  }, [category, status, limit, page, sortBy, order]);

  return (
    <div className="all-blogs-bg vh-100 w-100 d-flex flex-column justify-content-center align-items-center gap-2">
      <h1 className="text-white">All Blogs</h1>
      <div className="d-flex gap-2">
        <LogoutBtn />
        <button onClick={() => navigate("/add-blog")} className="btn btn-light">
          Add Blog
        </button>
      </div>

     
        <BlogFilters
          category={category}
          status={status}
          limit={limit}
          sortBy={sortBy}
          order={order}
          setCategory={setCategory}
          setStatus={setStatus}
          setLimit={setLimit}
          setSortBy={setSortBy}
          setOrder={setOrder}
        />
        <BlogTable allBlogs={allBlogs} page={page} limit={limit} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default AllBlogs;
