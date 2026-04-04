import { useState } from "react";

function CreateFolderModal({closeModal, createFolder}) {

    const [name, setName] = useState("");

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                    <button className="close-btn" onClick={closeModal}>
                        <i className="fa-solid fa-x" style={{color: "rgb(255, 255, 255)"}}></i>
                    </button>
                
                <h3>Enter the Folder Name</h3>

                <input type="text" placeholder="Folder Name" className="folder-input" value={name} onChange={(e) => setName(e.target.value)}/>
                <button className="create-btn" onClick={() => createFolder(name)}>Create</button>
            </div>
        </div>
    );
}

export default CreateFolderModal;