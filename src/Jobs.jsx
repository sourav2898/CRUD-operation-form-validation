import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const Jobs = () => {
    const jobs = useSelector(state => state.jobs);
    return (
        <>
            {
                jobs.map((value) => {
                    return <Card key={value.id} job={value} />
                })
            }
        </>
    )
}

export default Jobs;
