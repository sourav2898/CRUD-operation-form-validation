import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editJob } from './store';
import { remove } from './store';
import Edit from './Edit';
import { update_job } from './store';

const Card = ({ job }) => {

    const edit = useSelector(state => state.edit);
    const dispatch = useDispatch();
    const [pop, setPop] = useState("-1000px");

    const edit_job = () => {
        dispatch(editJob(job.id));
        setPop("130px");
    }

    const del = () => {
        dispatch(remove(job.id));
    }

    const close = () => {
        setPop("-1000px");
    }

    return (
        <>
            <div className="job">
                <div className="image">
                    <h3>{job.file}</h3>
                </div>
                <div className="details">
                    <h1>{job.title}</h1>
                    <h3>{job.des}</h3>
                    <div className="loc_exp">
                        <p>location : {job.location} </p>
                        <p>experience : {job.exp} </p>
                    </div>
                </div>
                <div className="actions">
                    <button className="btn btn-primary pd-10" onClick={edit_job}>Edit</button>
                    <button className="btn btn-danger pd-10" onClick={del}>Delete</button>
                </div>
            </div>

            <div className="edit" style={{ top: `${pop}` }}>
                <Edit close={close} />
            </div>

            {/* <Edit /> */}
        </>
    )
}

export default Card;
