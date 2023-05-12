import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";

const HomePage = () => {
  const profilePIcDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [terms, setTerms] = useState(false)
    const [img, setImg] = useState(profilePIcDefault)
    function handleSubmit(event){
        event.preventDefault();
        navigate('/admin/addperformance')

    if(name===""){
        toast.error("Name is required")
    }
    else if(email===""){
        toast.error("Email is required")
    }
    else if(password===""){
        toast.error("Password is required")
    }
    else{
        localStorage.setItem("name",name)
        localStorage.setItem("email",email)
        localStorage.setItem("password",password)
        localStorage.setItem("gender",gender)
        localStorage.setItem("terms",terms)
    }
}
const getBase=(file)=>{
    return new Promise((resolve,reject)=>{
        const reader =new FileReader()
        reader.onload=()=>resolve(reader.result)
        reader.onabort=(error)=>reject(error)
        reader.readAsDataURL(file)
    })
}
function handleImg(event){
    event.preventDefault();
    const file= event.target.files[0]
    getBase(file).then(base=>{
        localStorage['img']=base
        console.debug("File Stored",base)
    })
}
  return (
    <div>

      <div className="container content mt-4 " id="form">
        <h5> User Information</h5>
        <div className="row border p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="exampleInputName"
              className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e=>setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            {/* radios button inpput ================== */}
            <div className="d-flex flex-row">
              Gender :
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Male"
                  defaultChecked={gender==="Male"}
                  onClick={e=>setGender(e.target.value)}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Female"
                  defaultChecked={gender==="Female"}
                  onClick={e=>setGender(e.target.value)}
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={terms}
                onChange={e=> setTerms(e.target.value)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I Acept Terms And Conditions
              </label>
            </div>
            <button
              type="submit"
              className="form__submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="col-md-4 ">
            <div className="profile_section">
              <p>Select Profile Picture :</p>
              <img
                src={
                  localStorage.getItem("img")
                    ? localStorage.getItem("img")
                    : profilePIcDefault
                }
                alt="profile_pic"
                className="img-thumbnail"
                height={250}
                width={250}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
               type="file"
              onChange={handleImg}
               id="formFile" />
            </div>
          </div>
        </div><br/><br/>
      </div>
     <Footer/>
    </div>
  );
};
export default HomePage;