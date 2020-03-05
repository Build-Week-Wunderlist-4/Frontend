import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const initialItem = {
    task: '',
}

const UpdateTodo = props => {
    const history = useHistory();
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
        const itemToUpdate = props.tasks.find(task => `${task.id}` === id);
        if (itemToUpdate) {
            setItem(itemToUpdate);
        }
    }, [props.tasks, id]);

    const changeHandler = e => {
        e.persist();
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`https://wunderlistbuild.herokuapp.com/api/tasks/${id}`)
            .then(res => {
                props.setTasks(res.data);
                history.push(`/api/tasks/${id}`);
          
            })
            .catch(err => {
                console.log("error", err);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Task</label>
                <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Get this done"
                    value={item.name}
                    onChange={changeHandler}
                />

                <button type="submit">Update</button>
            </form>
        </>
    )
};

export default UpdateTodo;