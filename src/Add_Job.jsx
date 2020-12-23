import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import shortid from 'shortid';
import {addjob} from './store';

const Add_Job = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [exp, setExp] = useState("");
    const [location, setLocation] = useState("");
    const [des, setDes] = useState("");
    const [file, setFile] = useState("");

    const submit = (e) => {
        e.preventDefault();

        const new_contact = {
            id:shortid.generate(),
            title: title,
            location:location,
            des:des,
            exp:exp,
            file:file,
        }

        dispatch(addjob(new_contact));
        setTitle("");
        setExp("");
        setLocation("");
        setDes("");
        setFile("");
    }


    return (
        <>
            <div className="card">
                <h5 className="card-header">Add Job</h5>
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="form-group ">
                            <input type="text" className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Job Title" required />
                        </div>
                        <div className="form-group">
                            <select className="form-control"
                                value={exp}
                                onChange={(e) => setExp(e.target.value)}
                                required>
                                <option value="">Experience </option>
                                <option>1 year</option>
                                <option>2 years</option>
                                <option>3 years</option>
                                <option>4 years</option>
                                <option>5 years</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <input type="text"
                                className="form-control"
                                placeholder="Job Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control"
                                rows="3"
                                placeholder="Job Description"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                                required></textarea>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Choose file / image"
                                value= {file} 
                                onChange = {(e) => setFile(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mb-2">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Add_Job;
