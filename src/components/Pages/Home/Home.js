import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Utilities/Loading';
import './Home.css';

const Home = () => {
    const [user, loading, error] = useAuthState(auth);


    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        if (user) {
            getData();
        }

    }, [user]);

    console.log(user);

    const handleAddTask = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const task = { email: user?.email, title, description, completed: false };
        const url = "https://tusar-todo.herokuapp.com/task";

        const { data } = await axios.post(url, task);
        if (data.insertedId) {
            toast.success('Task added successfully !!');
            getData();
            event.target.reset();
        }
    }

    const getData = async () => {
        const email = user?.email;
        const url = `https://tusar-todo.herokuapp.com/task?email=${email}`;
        const { data } = await axios.get(url);
        setTasks(data);
        setIsLoading(false)
    }
    const handleDoneTask = async (id) => {
        const url = `https://tusar-todo.herokuapp.com/task/${id}`;
        const { data } = await axios.put(url);
        if (data.modifiedCount) {
            toast.success('Task Completed');
            getData();
        }
    }

    const handleDeleteTask = async (id) => {
        const url = `https://tusar-todo.herokuapp.com/task/${id}`;
        console.log(url)
        const { data } = await axios.delete(url);
        if (data.deletedCount) {
            toast.success("Task deleted successfully !!")
            getData();
        }
    }




    if (loading || isLoading) {
        return <Loading />
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col md={8}>

                    
                        {
                            tasks.length > 0
                            ?
                                tasks.map(task =>
                                    <div key={task._id} className={task.completed ? 'tasks completed' : 'tasks'}>
                                      
                                        <div className="task rounded my-3 p-2 shadow-sm d-flex justify-content-between align-items-center">
    
                                            <div onClick={() => handleDoneTask(task._id)} className="task-inner d-flex align-items-center ">
                                                <div className={task.completed ? 'check active' : 'check'}>
                                                    <FaCheck />
                                                </div>
                                                <div className="task-details ">
                                                    <div className="task-name">
                                                        <h5>{task.title} </h5>
                                                    </div>
                                                    <div className="task-disc">
                                                        <p> {task.description}</p>
                                                    </div>
                                                </div>
    
                                            </div>
                                            <div className="action">
                                                <Button onClick={() => handleDoneTask(task._id)} className='mx-2' variant="primary" size="md" active  disabled={task.completed}>
                                                {task.completed ? 'Completed' : 'Complete'}
                                                </Button>
                                                <Button onClick={() => handleDeleteTask(task._id)} variant="outline-danger"> <FaTrashAlt /> </Button>
                                            </div>
                                        </div>
    
                                    </div>
    
                                )

                            :
                            <h4 className='py-5 text-center'>No Tasks Found</h4>
                           
                        }

                    </Col>
                    <Col md={4}>

                        <div className="form-area">
                            <Form onSubmit={handleAddTask} >

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Task Title</Form.Label>
                                    <Form.Control name='title' type="text" placeholder="i.e Take Breakfast" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name='description' as="textarea" rows={3} />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Add Task
                                </Button>
                            </Form>
                        </div>

                    </Col>
                </Row>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>

        </div>
    );
};

export default Home;