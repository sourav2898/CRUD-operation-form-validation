import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const inintalState = {
    jobs: [],
    edit: null,
    refresh: true,
}

// if(!inintalState.refresh){
//     window.addEventListener("beforeunload", (e) => {
//         e.preventDefault();
//         e.returnValue="";
//     });
// }
const isEqual = (obj1, obj2) => {
    const obj1keys = Object.keys(obj1);
    const obj2keys = Object.keys(obj2);

    for (let objkey of obj1keys) {
        if (obj1[objkey] !== obj2[objkey]) {
            return false;
        }
    }

    return true;
}

export const addjob = (details) => {
    return {
        type: "ADD_JOB",
        payload: details,
    };
}

export const editJob = (id) => {
    return {
        type: "EDIT_JOB",
        payload: id,
    };
}

export const remove = (id) => {
    return {
        type: "REMOVE_JOB",
        payload: id,
    };
}

export const update_job = (details) => {
    return {
        type: "UPDATE_JOB",
        payload: details,
    };
}


const contactReducer = (state = inintalState, action) => {
    switch (action.type) {
        case "ADD_JOB":
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            }
        case "EDIT_JOB":
            let arr = state.jobs.filter((job) => job.id == action.payload);
            arr = arr.values();
            for (let val of arr) {
                arr = val;
            }
            return {
                ...state,
                edit: arr,
                refresh: false,
            }
        case "REMOVE_JOB":
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.id != action.payload),
            }
        case "UPDATE_JOB":
            const equal = isEqual(action.payload, state.edit);

            if (equal) {
                alert("updated successfully");
                return {
                    ...state,
                    jobs: state.jobs.map((job) => job.id == action.payload.id ? action.payload : job),
                    refresh: true ,
                }
            }
            else {
                if (action.payload.file.trim() === "") {
                    alert("fields can not be empty.");
                    return {
                        ...state,
                        refresh: true,
                    }
                }
                else {
                    var r = window.confirm("You want ot save the changes!");
                    if (r == true) {
                        alert("updated successfully");
                        return {
                            ...state,
                            jobs: state.jobs.map((job) => job.id == action.payload.id ? action.payload : job),
                            refresh: true ,
                        }
                    } else {
                        return {
                            ...state,
                            refresh: true ,
                        }
                    }
                }

            }

        default:
            return state;
    }
}

const store = createStore(contactReducer, composeWithDevTools());

export default store;