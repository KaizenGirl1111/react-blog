function BlogTable({allBlogs,page,limit}){
    return(
        <>
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
        </>
    )
}

export default BlogTable