//##############################################################################################
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
//##############################################################################################

//##############################################################################################
export const ModalActions = ({ open, onCloseModal, getPets, edit, pet }) => {
    const initialState = {
        nombres: "",
        apellidos: "",
        id: "",
        tcontrato: "Fijo",
    };

    const [dataPet, setDataPet] = useState(initialState);
    const tcolores = [
        "No aplica",
        "Blanco",
        "Negro",
        "Gris",
        "Marron",
        "Amarillo",
        "Verde",
        "Beige",
    ];
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        edit ? setDataPet(pet) : setDataPet(initialState);
        //eslint-disable-next-line
    }, [edit, pet]);

    const handleChange = (e) => {
        setDataPet({ ...dataPet, [e.target.name]: e.target.value });
    };

    const actions = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let resp = {};
            edit
                ? (resp = await axios.put(`/pets/${pet._id}`, dataPet))
                : (resp = await axios.post("/pets", dataPet));
            Swal.fire({
                icon: "success",
                title: resp.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
            onCloseModal();
            getPets();
        } catch (error) {
            setLoading(false);
            if (!error.response.data.ok) {
                return Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log("error en la funcion actions", error.message);
        }
    };

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="card">
                    <div className="card-header">
                        <h5>{edit ? "Update Mascota" : "Add Mascota"}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={actions}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    required
                                    autoFocus
                                    onChange={(e) => handleChange(e)}
                                    value={dataPet.name}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Clase</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="type"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    value={dataPet.type}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <select
                                    name="color"
                                    className="form-select"
                                    onChange={(e) => handleChange(e)}
                                    value={dataPet.color}
                                >
                                    {tcolores.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Edad</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    value={dataPet.age}
                                />
                            </div>
                            {!loading ? (
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary form-control"
                                    >
                                        {edit ? "Actualizar" : "Guardar"}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary form-control"
                                    disabled
                                >
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    {edit ? " Actualizando" : " Guardando"}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
//##############################################################################################
