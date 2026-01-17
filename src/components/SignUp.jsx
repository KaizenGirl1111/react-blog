import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu,DropdownContent,DropdownMenuItem,DropdownMenuTrigger } from "../assets/dropdown-menu";
function SignUp() {
  // const [email, setEmail] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState(null);
  // const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "User",
  });

  const [formType, setFormType] = useState({ email: "", phone: "" });
  const navigate = useNavigate()

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const handleChange = (e) => {
    const { name, value } = e.target; //1st method
    // if(name==="username")setUsername(value)
    // else if(name==="phone") (phone!==null||NaN)&& setPhone(parseInt(value))
    // else if(name==="password") setPassword(value)
    // else if(name==="email") (email!==null||NaN) && setEmail(value)
    // else if(name==="role") setRole(value)
    console.log("name and value", name, value);
    // if(name==="phone")setFormData((prev)=>({...prev,[name]:parseInt(value)}))
    // else if(name==="email") setFormData((prev)=>({...prev,[name]:value})) //2nd method
    // else{
    setFormData((prev) => ({ ...prev, [name]: value }));
    //  }
  };
  const handleSubmit = (e) => {
    console.log("submit event", e.target);
    e.preventDefault();
    signUpUser(formData);
    console.log("form data during submission", formData);
    // console.log("formData fields printed separately",{username,email,password,phone,role})
  };

  const signUpUser = async (formData) => {
    try{
    let res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("formData", formData);
    let data = await res.json();
    console.log("data", data);
    if(typeof data==='object')navigate('/login')
  }
  catch(error){
    console.log(error)
  }
  };
  return (
    <>
      <button onClick={() => setFormType({ phone: false, email: true })}>
        Sign up with email
      </button>
      <button onClick={() => setFormType({ email: false, phone: true })}>
        Sign up with phone
      </button>
      {formType.email && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter name"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={formData?.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Select Role" disabled>
              Select Role
            </option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Guest">Guest</option>
          </select>
          <br />
          <input type="submit" value="submit" />
        </form>
      )}
      {formType.phone && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter name"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter phone"
            value={formData?.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownContent side="top"
              align="start"
              className="[--radius:0.95rem]">
              <DropdownMenuItem>User</DropdownMenuItem>
              <DropdownMenuItem>Admin</DropdownMenuItem>
              <DropdownMenuItem>Guest</DropdownMenuItem>
            </DropdownContent>
          {/* <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Select Role" disabled>
              Select Role
            </option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Guest">Guest</option>
          </select> */}
          </DropdownMenu>
          <br />
          <input type="submit" value="submit" />
        </form>
      )}
    </>
  );
}

export default SignUp;
