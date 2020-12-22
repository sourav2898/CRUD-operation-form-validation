import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update_job } from './store';

const Edit = ({ close }) => {

    const edit = useSelector(state => state.edit);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [exp, setExp] = useState("");
    const [location, setLocation] = useState("");
    const [des, setDes] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        if (edit != null) {
            setTitle(edit.title);
            setDes(edit.des);
            setExp(edit.exp);
            setLocation(edit.location);
            setFile(edit.file)
        }
    }, [edit])

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            e.returnValue="";
        });
    }, [])

    const update = (e) => {
        e.preventDefault();
        const update_job_details = { id: edit.id, title: title, exp: exp, location: location, des: des, file: file,};
        dispatch(update_job(update_job_details));
        if (edit != null) {
            setTitle(edit.title);
            setDes(edit.des);
            setExp(edit.exp);
            setLocation(edit.location);
            setFile(edit.file)
        }
        close();
    }

    return (
        <div className="card">
            <h5 className="card-header">Edit Job <button onClick={close}> x </button></h5>
            <div className="card-body">
                <form onSubmit={update}>
                    <div className="form-group ">
                        <input type="text" className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Job Title" required />
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={exp}
                            onChange={(e) => setExp(e.target.value)}>
                            <option>Experience </option>
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
                            onChange={(e) => setLocation(e.target.value)} required />
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
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
                            required />
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
