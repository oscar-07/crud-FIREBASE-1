                //actualiza componente
import React, {useEffect, useState} from 'react';
import Linkform from './linkform';
import {toast} from 'react-toastify';
import db from '../firebase';


const Links =() =>{
    const [ligas, setLigas] = useState([]);
    const [editarId, seteditarId] = useState("");

    
    
    
    
    //es un evento
    const tomaligas = async() =>{
        db.collection('ligas').onSnapshot((querySnapshot) =>{
            const docs = [];
            querySnapshot.forEach((doc) =>{
                docs.push({...doc.data(), id:doc.id });
            });
            setLigas(docs);
        });
    };


    //borrar cosas  recordar el async
    const borrarligas = async id =>{
        if (window.confirm('¿Estas Seguro?')){
            await db.collection('ligas').doc(id).delete();
            toast('Eliminado',{
                type: 'error',
                autoClose: 3000
            });
        };
    };
    
    
    useEffect(()=>{
        tomaligas();
    }, []);
    
    
    //aqui es el crud
    const agregaroeditarinfo = async (objeto) =>{
        try {
            if (editarId === ""){
                await db.collection('ligas').doc().set(objeto);
                toast('Agregado',{
                    type: 'success',
                    autoClose: 3000
                });
            }else{
                await db.collection('ligas').doc(editarId).update(objeto);
                toast('Actualizado :)',{
                    type: 'info',
                    autoClose: 3000
                });
                seteditarId('');
            }
        } catch (error) {
            console.error(error)
        }
    };
    
    
    return (
        <>
        <div className="col-md-8 p-2">
            <Linkform {...{agregaroeditarinfo, editarId, ligas}}/>
        </div>
        <div className="col-md-8 p-2">
            {ligas.map((link) => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4>{link.nombre}</h4>
                                <i className="material-icons text-danger" onClick={()=>borrarligas(link.id)}>close</i>
                                <i className="material-icons" onClick={()=>seteditarId(link.id)}>create</i>
                            </div>
                        </div>
                        <p>{link.descripcion}</p>
                        <a href={link.url} target="_blank" rel="noreferrer">Ir directamente</a>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
};

export default Links;