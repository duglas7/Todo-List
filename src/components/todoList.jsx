import React, { useState } from "react";
import uniqid from "uniqid";

const TodoList = () => {
    const [tarea, setTarea] = useState("");
    const [listaTareas, setListaTareas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);
  
    const addTarea = (e) => {
      e.preventDefault();
      if(!tarea.trim()) {
        setError("El campo nombre esta vacio");
        return;
      }
      const nuevaTarea = {
        id: uniqid(),
        tituloTarea: tarea,
      };
      setListaTareas([...listaTareas, nuevaTarea]);
      setTarea("");
      setError(null);
    };
  
    const deleteTarea = (id) => {
      const nuevoArray = listaTareas.filter((item) => item.id !== id);
      setListaTareas(nuevoArray);
    };
  
    const editar = (item) => {
      setModoEdicion(true);
      setTarea(item.tituloTarea);
      setId(item.id);
    }
  
    const editarTarea = (e) => {
      e.preventDefault();
      const nuevoArray = listaTareas.map( item => item.id === id ? { id:id, tituloTarea: tarea } : item);
      setListaTareas(nuevoArray);
      setModoEdicion(false);
      setTarea('');
    }

  return (
    <div className="container">
      <h2 className="text-center">TodoList App</h2>
      <div className="row">
        <div className="col">
          <h2 className="text-center">Formulario</h2>
          <form
            className="form-group"
            onSubmit={modoEdicion ? editarTarea : addTarea}
          >
            <input
              className="form-control mb-2"
              onChange={(e) => {
                setTarea(e.target.value);
              }}
              placeholder="Ingresa tu tarea aqui..."
              value={tarea}
              type="text"
            />
            <input
              className="btn btn-info btn-block"
              value={modoEdicion ? 'EDITAR TU TAREA' : 'REGISTRAR TU TAREA'}
              type="submit"
            />
          </form>
          {
            error != null ? (
              <div className="alert alert-danger"> {error} </div>
            ) : null
          }
        </div>
        <div className="col">
          <h2 className="text-center">Listado</h2>
          <ul className="list-group">
            {listaTareas.map((item) => (
              <li className="list-group-item gray font-weight-bold align-center" key={item.id}>
                {item.tituloTarea}
                <button 
                  className="btn btn-danger float-right ml-1"
                  onClick={()=>{deleteTarea(item.id)}}
                >
                    BORRAR
                </button>
                <button 
                  className="btn btn-info float-right"
                  onClick={()=>{editar(item)}}
                >
                    EDITAR
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
