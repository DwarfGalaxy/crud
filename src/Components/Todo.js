import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Get Data from local storage
const getData = () => {
    let newItem = JSON.parse(localStorage.getItem(('parmanentData')));
    if (newItem) {
        return newItem;
    } else {
        return [];
    }
}

function Todo() {
    
    const [currData, setCurrData] = useState("");
    const [datas, setDatas] = useState(getData());
    const [action, setAction] = useState(true);
    const [editId, seteditId] = useState(0);
    const notify = () => toast("Please enter the value!", {
        position: "top-center"
    });

    // Add Item
    const addItem = () => {
        if (!currData) {
            notify();
        } else if (!action && currData) {
            setAction(true);
            setDatas(datas.map((value) => {
                if (value.id === editId) {
                    return { ...value, item: currData }
                } else {
                    return value;
                }

            }))

        } else {
            let newData = { id: Math.random() * 1000, item: currData };
            setDatas([...datas, newData]);
        }
        setCurrData("");
    }

    // Delete Item
    const deleteItem = (index) => {
        let remainingItem = datas.filter((value) => {
            return index !== value.id;
        });
        setDatas(remainingItem);
    }

    // Store data in local storage
    useEffect(() => {
        localStorage.setItem('parmanentData', JSON.stringify(datas));
    }, [datas]);

    // Edit Item
    const editItem = (id) => {
        setAction(false);
        let updateItem = datas.find((value) => {
            return id === value.id;
        }
        )
        setCurrData(updateItem.item);
        seteditId(id);
    }
    return (
        <>
            <div className="container text-center mt-5 " >
                <div className="row ">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6  bg-white rounded " id='firstCol'>
                        <p className='text-center mt-3 fw-bolder fs-1' id='heading'>To Do List</p>

                        <input type="text" className="form-control " value={currData} onChange={(event) => setCurrData(event.target.value)} id='inpTag' />

                        {action ? <button className='bg-white fs-2 px-4 border-0' onClick={() => addItem()}><i className="fa fa-plus-circle" id='addBtn'></i></button> :
                            <button className='bg-white fs-2 px-4 border-0' onClick={() => addItem()}><i className=" fa fa-pencil-square-o" id='addBtn' ></i></button>}

                        <div className="container ">
                            {datas.map((value) => {
                                return <div className="d-flex justify-content-between mt-5  ms-5 border-bottom border-end mb-3 border-success border-3 " key={value.id}>
                                    <p className='fw-bolder fs-4 ms-3 my-auto'>{value.item}</p>
                                    <div>
                                        {/* Delete */}
                                        <button onClick={() => deleteItem(value.id)} className=" border-0 bg-white fs-4"  ><i className="fa fa-trash" id='deleteBtn'></i></button>

                                        {/* Update */}
                                        <button className=' mx-2 border-0  fs-4 bg-white' onClick={() => editItem(value.id)} ><i className="fa fa-pencil" id='editBtn'></i></button>
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                        <img src="todo.jpg" className='my-auto rounded img-fluid img-thumbnail' alt="" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Todo
