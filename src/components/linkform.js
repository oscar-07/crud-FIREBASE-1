import React, {useState, useEffect} from 'react'
import db from '../firebase';

import {toast} from 'react-toastify';

const Linkform =(props) =>{
    const estadoinicialvalores = {
        url: '',
        nombre: '',
        descripcion: ''
    };
    const [valores, setValores] = useState(estadoinicialvalores);

    //maneja eventos DEPENDIENDO QUE ESCOJA ES LO QUE RECIBE TODO ES ASINCRONO
    const entradas = (e) =>{
        const {name, value} =e.target;
            setValores({ ...valores, [name]: value}); 
    };

    const validacionURL = str =>{
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
              "(\\#[-a-z\\d_]*)?$",
            "i"
          ); // fragment locator
          return !!pattern.test(str);
    }

    const agarre = (e) =>{
        e.preventDefault();

        if (!validacionURL(valores.url)) {
            return toast("Parametro URL no admitido", { type: "warning", autoClose: 3000 });
        }
    
        props.agregaroeditarinfo(valores);
        setValores({...estadoinicialvalores});
    };

    const tomarlink = async (id) =>{
        const doc = await db.collection('ligas').doc(id).get();
        setValores({ ...doc.data()});
    };

    useEffect(() =>{
        if(props.editarId === ""){
            setValores({ ...estadoinicialvalores});
        }else{
            tomarlink(props.editarId);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.editarId]);

    return (
        <form onSubmit={agarre} className="card card-body border-primary">
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>                  
                <input type="text" className="form-control" name="url" value={valores.url} placeholder="https://tu-enlace.com" onChange={entradas}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" name="nombre" value={valores.nombre} placeholder="Nombre del sitio" onChange={entradas}/>
            </div>
            <div className="form-group">
                <textarea name="descripcion" rows="3" className="form-control" value={valores.descripcion} placeholder="Prop. la descripción" onChange={entradas}></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.editarId ===''? 'Guardar': 'Actualizar'}
            </button>
        </form>
    );
};

export default Linkform;