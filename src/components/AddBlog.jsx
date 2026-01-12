import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../assets/dropdown-menu"

function AddBlog() {
  const navigate = useNavigate()
 // const token = sessionStorage.getItem("token")
 // const token = localStorage.getItem("token")
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("form Data ", formData);
    const formFields = {
      title: formData.get("title"),
      author: formData.get("author"),
      content: formData.get("content"),
      status: formData.get("status"),
      category:formData.get("category")
    };
    console.log("formFields ",formFields)
    console.log("priority ",formData.getAll("priority"))
    console.log("testchecbox ",formData.getAll("testcheckbox"))
    console.log("title ",formData.get("title"))
    console.log("content ",formData.get("content"))
    console.log("category ",formData.get("category"))
    createBlog(formFields);
  };
  const createBlog = async (formData) => {
    try{
    const res = await fetch("http://localhost:8002/blog", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
     //   Authorization: `Bearer ${token}`,
      },
      credentials:"include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.title){
    //  localStorage.removeItem("cat")
    console.log("title",data.title)
      navigate('/all-blogs')
    }
    console.log("be response", data);
  }
  catch(error){
    console.log(error)
  }
  };

  return (
       <div className="all-blogs-bg vh-100 w-100 d-flex flex-column justify-content-center align-items-center gap-2 text-white">
      <LogoutBtn/>
      <h1>Add blog</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="d-flex gap-4 mb-1">
        <label for="title">Title: </label>
        <input type="text" placeholder="Enter title" name="title" id="title" />
        </div>
         <div className="d-flex gap-2 mb-1">
        <label for="author">Author: </label>
        <input
          type="text"
          placeholder="Enter author"
          name="author"
          id="author"
        />
        </div>
        <label for="content">Content: </label>
        <textarea
          type="text"
          placeholder="Enter content"
          name="content"
          id="content"
        />
        <br />
        <br />
        <input type="radio" name="status" id="pending" value="Pending" />
        <label htmlFor="pending">Pending</label>
        <input
          type="radio"
          name="status"
          id="in-progress"
          value="In Progress"
        />
        <label htmlFor="in-progress">In Progress</label>
        <input type="radio" name="status" id="completed" value="Completed" />
        <label htmlFor="completed">Completed</label>
         <br/>
     <br/>
     <select name="category" id="category" className="text-dark">
        <option disabled selected>Select category</option>
        <option value="Poetry">Poetry</option>
        <option value="Article">Article</option>
        <option value="Story">Story</option>
        <option value="Other" selected>Other</option>
     </select>
     <br/>
     <br/>
     <select name="priority" id="priority" className="text-dark">
     <option disabled selected>Select Priority</option>
     <option value="High">High</option>
     <option value="Medium">Medium</option>
     <option value="Low">Low</option>
     </select>
     <br/>
     <br/>
     <input type="checkbox" name="testcheckbox" id="test1" value="test1"/>
     <label htmlFor="test1">Test 1</label>
      <input type="checkbox" name="testcheckbox" id="test2" value="test2"/>
     <label htmlFor="test2">Test 2</label>
      <input type="checkbox" name="testcheckbox" id="test3" value="test3"/>
     <label htmlFor="test3">Test 3</label>
     <br/>
     <br/>
      <input type="submit" value="submit" className="btn btn-light" />
      </form>
    </div>
  );
}

export default AddBlog;
