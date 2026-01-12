import { useState } from "react";

function AddBlog(){
    const [formData,setFormData] = useState({
        title:"",
        author:"",
        content:"",
        category:"Other"
    })

    const handleChange = (e)=>{
        const {name,value} = e.target 
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const createBlog = async ()=>{
        const res = await fetch('http://localhost:8002/blog',{
            method:'POST',
            headers:{'Content-type':'application/json',"Authorization":`Bearer ${token}`},
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        console.log("be response",data)
    }
    const token = '1234'

    const handleSubmit = (e)=>{
        e.preventDefault()
        try{
       createBlog()
      console.log(formData)
        setFormData({title:"",
        author:"",
        content:"",
        category:"Other"})
        }
        catch(err){
          console.log(err)
        }
    }

return (
    <div style={{display:"flex", flexDirection:"column"}}>
    <h1>Add blog</h1>
    <form onSubmit={handleSubmit}>
     <label for="title">Title: </label>
     <input type="text" placeholder="Enter title" name="title" id="title" value={formData.title} onChange={handleChange}/>
     <br/>
     <br/>
     <label for="author">Author: </label>
     <input type="text" placeholder="Enter author" name="author" id="author" value={formData.author} onChange={handleChange}/>
     <br/>
     <br/>
     <label for="content">Content: </label>
     <textarea type="text" placeholder="Enter content" name="content" id="content" value={formData.content} onChange={handleChange}/>
     <br/>
     <br/>
     <select name="category" id="category" value={formData.category} onChange={handleChange}>
        <option disabled>Select category</option>
        <option value="Poetry">Poetry</option>
        <option value="Article">Article</option>
        <option value="Story">Story</option>
        <option value="Other">Other</option>
     </select>
     <br/>
     <br/>
     <input type="submit" value="submit"/>
    </form>
    </div>
)
}

export default AddBlog;