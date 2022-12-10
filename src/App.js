import './app.scss';
import bgDesktop from './images/bg-desktop-light.jpg';
import bgMobile from './images/bg-mobile-light.jpg';
import {ReactComponent as Moon} from './images/icon-moon.svg';
import {ReactComponent as Sun} from './images/icon-sun.svg'
import {ReactComponent as Close} from "./images/icon-cross.svg";
import {ReactComponent as Check} from "./images/icon-check.svg";
import {useEffect, useState} from "react";

const AddTaskForm = ({addTask}) => {
    const [value, setValue] = useState("");
    const [status, setStatus] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (value) {
            value && addTask(value, status)
            setValue("");
            setStatus(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-task">
            <span className={status ? 'checkbox completed' : 'checkbox'} onClick={e => setStatus(current => !current)}>
                <Check/>
            </span>

            <input
                type="text"
                value={value}
                placeholder="Create a new todo..."
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

const App = () => {

    const [tasks, setTasks] = useState([{
        id: 1,
        text: "Like",
        isCompleted: false
    }, {
        id: 2,
        text: "Comment",
        isCompleted: false
    }, {
        id: 3,
        text: "Subscribe",
        isCompleted: false
    }]);
    
    const [filtered, setFiltered] = useState(tasks);
    const [filteredStatus, setFilteredStatus] = useState('all');

    useEffect( ()=> {
        setFiltered(tasks);
    },[tasks.length])

    const addTask = (text, isCompleted) => setTasks([...tasks, {id: tasks.pop().id + 1, text, isCompleted}]);

    const toggleTask = id => {
        const newTasks = [...tasks];
        newTasks.map((el) => {
            if (el.id === id)
                el.isCompleted = !el.isCompleted
        })
        setTasks(newTasks);
    };

    const removeTask = id => {
        const newTasks = [...tasks];
        newTasks.splice(id, 1);
        setTasks(newTasks);
    };
    
    const todoFilter = status => {
        if (status === 'all') {
            setFiltered(tasks);
            setFilteredStatus('all');
        } else {
            let newTodo = tasks.filter(el => el.isCompleted === status)
            setFiltered(newTodo);
            setFilteredStatus(status);
        }
    }
    
    const removeCompleted = () => {
        let newTasks = [...tasks].filter( el => el.isCompleted !== true)
        setTasks(newTasks);
    }

    return (

        <div className="App">
            <picture>
                <source srcSet={bgDesktop} media="(min-width: 768px)"/>
                <img src={bgMobile} alt="bg"/>
            </picture>
            <div className="header">
                <p className="name">TODO</p>
                <Moon className="dark"/>
                <Sun className="light"/>
            </div>
            <AddTaskForm addTask={addTask}/>


            <div className="todo-list">
                {filtered.map((task) => (
                    <div className="todo" key={task.id}>
                        <span className={task.isCompleted ? "checkbox completed" : "checkbox"} onClick={() => toggleTask(task.id)}>
                            <Check/>
                        </span>
                        <p className="todo-text" onClick={() => toggleTask(task.id)}>{task.text}</p>
                        <Close className="todo-delete" onClick={() => removeTask(task.id)}/>
                    </div>
                ))}
                
                <div className="todo-additional">
                    <p className="count">{tasks.filter(el=> el['isCompleted'] === false).length} items left</p>
                    <div className="filters">
                        <button onClick={() => todoFilter('all')} className={filteredStatus === 'all' ? 'active':''}>All</button>
                        <button onClick={() => todoFilter(false)} className={filteredStatus === false ? 'active':''}>Active</button>
                        <button onClick={() => todoFilter(true)} className={filteredStatus === true ? 'active':''}>Completed</button>
                    </div>
                    <button className="delete" onClick={() => removeCompleted()}>Clear Completed</button>
                </div>
            </div>
            
            <p className="info">Drag and drop to reorder list</p>
        </div>
    );
}

export default App;
