import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update_job, save_update } from './store';

const Edit = (props) => {

    const edit = useSelector(state => state.edit);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [exp, setExp] = useState("");
    const [location, setLocation] = useState("");
    const [des, setDes] = useState("");
    const [file, setFile] = useState("");
    const [changed, setChange] = useState(false);
    const [display, setDisplay] = useState("none");
    const [display_text, setDisplayText] = useState("none");
    const [display_image, setDisplayImage] = useState("none");
    const [allow, setAllow] = useState("allow");
    const [value, setValue] = useState("");
    const [read,setRead] = useState({
        title:true,
        desc:true,
        location:true,
        exp:true,
        file:true
    });

    useEffect(() => {
        console.log(changed);
        if (edit != null) {
            setTitle(edit.title);
            setDes(edit.des);
            setExp(edit.exp);
            setLocation(edit.location);
            setFile(edit.file);
        }
    }, [edit])

    const nothing = () => {
        
    }

    const Ok = () => {
        setDisplayImage("none");
        setDisplayText("none");
        setAllow("allow");
    }

    const update = (e) => {
        
    }

    const close = () => {
        if(title=="" || exp=="" || location=="" || des==""){
            setDisplayText("block");
            setAllow("dont");
        }
        else if(file==""){
            setDisplayImage("block");
            setAllow("dont");
        }
        else if (changed) {
            // console.log("change");
            // console.log(changed);
            setAllow("dont");
            setDisplay("block");
        }
        else {
            // const update_job_details = { id: edit.id, title: title, exp: exp, location: location, des: des, file: file, };
            // dispatch(update_job(update_job_details));
            setDisplay("none");
            props.close();
        }

        // if (edit != null) {
        //     setTitle(edit.title);
        //     setDes(edit.des);
        //     setExp(edit.exp);
        //     setLocation(edit.location);
        //     setFile(edit.file)
        // }
        setChange(false);
        window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
            e.returnValue = "";
        });

    }

    const save = () => {
        const update_job_details = { id: edit.id, title: title, exp: exp, location: location, des: des, file: file, };
        console.log(update_job_details);
        dispatch(save_update(update_job_details));
        setDisplay("none");
        if (edit != null) {
            setTitle(edit.title);
            setDes(edit.des);
            setExp(edit.exp);
            setLocation(edit.location);
            setFile(edit.file);
        }
        window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
            e.returnValue = "";
        }); 
        setAllow("allow");
        props.close();

    }

    const dont = () => {
        if (edit != null) {
            setTitle(edit.title);
            setDes(edit.des);
            setExp(edit.exp);
            setLocation(edit.location);
            setFile(edit.file);
        }
        window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
            e.returnValue = "";
        });
        setAllow("allow");
        props.close();
    }

    return (
        <div className="card">
            <h5 className="card-header">Edit Job <button className="btn btn-danger" onClick={() => `${allow}`=="allow" ? close() : nothing() }> x </button></h5>
            <div className="card-body">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(`${allow}`=="allow"){
                        return close();
                    }
                    else return nothing();
                    // return save();
                }}>
                    <div className="dialogue" style={{ display: `${display}` }}>
                        <h5>Update the changes!</h5>
                        <button className="btn btn-primary" onClick={save}>YES</button>
                        <button className="btn btn-danger" onClick={dont}>NO</button>
                    </div>
                    <div className="text_empty" style={{ display: `${display_text}` }}>
                        <h5>All the fields must be filled.</h5>
                        <button className="btn btn-primary" onClick={Ok}>Ok</button>
                    </div>
                    <div className="image_empty" style={{ display: `${display_image}` }}>
                        <h5>Image can not be empty.</h5>
                        <button className="btn btn-primary" onClick={Ok}>Ok</button>
                    </div>
                    <div className="form-group ">
                    <label>
                        <input  type="radio" 
                                value="title"
                                checked={value==="title"}
                                onChange={(e) =>{
                                    setValue(e.target.value);
                                    setRead(
                                        {
                                            title:false,
                                            desc:true,
                                            location:true,
                                            exp:true,
                                            file:true
                                        }
                                    )
                                } }
                                />
                        <input type="text" className="form-control"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setChange(true);
                                window.addEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                                window.removeEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                            }}
                            placeholder="Job Title"
                            required 
                            readOnly={read.title}
                            />
                    </label>
                        
                    </div>
                    <div className="form-group">
                        <input  type="radio" 
                                value="experience"
                                checked={value==="experience"}
                                onChange={(e) =>{
                                    setValue(e.target.value)
                                    setRead(
                                        {
                                            title:true,
                                            desc:true,
                                            location:true,
                                            exp:false,
                                            file:true
                                        }
                                    )
                                } }
                                />
                        <select className="form-control" value={exp}
                            onChange={(e) => {
                                setExp(e.target.value);
                                setChange(true);
                                window.addEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                            }} disabled={read.exp}>
                            <option disabled>Experience </option>
                            <option>1 year</option>
                            <option>2 years</option>
                            <option>3 years</option>
                            <option>4 years</option>
                            <option>5 years</option>
                        </select>
                    </div>
                    <div className="form-group ">
                        <input  type="radio" 
                                value="location"
                                checked={value==="location"}
                                onChange={(e) =>{
                                    setValue(e.target.value)
                                    setRead(
                                        {
                                            title:true,
                                            desc:true,
                                            location:false,
                                            exp:true,
                                            file:true
                                        }
                                    )
                                } }
                                />
                        <input type="text"
                            className="form-control"
                            placeholder="Job Location"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setChange(true);
                                window.addEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                            }}
                            required readOnly={read.location}/>
                    </div>
                    <div className="form-group">
                        <input  type="radio" 
                                value="desc"
                                checked={value==="desc"}
                                onChange={(e) =>{
                                    setValue(e.target.value)
                                    setRead(
                                        {
                                            title:true,
                                            desc:false,
                                            location:true,
                                            exp:true,
                                            file:true
                                        }
                                    )
                                } }
                                />
                        <textarea className="form-control"
                            rows="3"
                            placeholder="Job Description"
                            value={des}
                            onChange={(e) => {
                                setDes(e.target.value);
                                setChange(true);
                                window.addEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                            }}
                            required readOnly={read.desc}></textarea>
                    </div>
                    <div className="form-group">
                        <input  type="radio" 
                                value="file"
                                checked={value==="file"}
                                onChange={(e) =>{
                                    setValue(e.target.value)
                                    setRead(
                                        {
                                            title:true,
                                            desc:true,
                                            location:true,
                                            exp:true,
                                            file:false
                                        }
                                    )
                                } }
                                />
                        <input type="text"
                            className="form-control"
                            placeholder="Choose file / image"
                            value={file}
                            onChange={(e) => {
                                setFile(e.target.value);
                                setChange(true);
                                window.addEventListener("beforeunload", (e) => {
                                    e.preventDefault();
                                    e.returnValue = "";
                                });
                            }}
                            required readOnly={read.file} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary mb-2" type="submit">Update</button> 
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Edit;
