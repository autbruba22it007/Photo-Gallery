import { useState } from "react";
import { useEffect } from "react";
import FolderGrid from "../components/FolderGrid";
import CreateFolderModal from "../components/CreateFolderModal";


function GalleryHome() {
  const [showModal, setShowModal] = useState(false);

  const [folders, setFolders] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/folders")
    .then(res => res.json())
    .then(data => setFolders(data))
    .catch(err => console.log(err));
}, []);


// API Folder call
  const createFolder = async (name) => {

  if (!name.trim()) return;

  try {

    const res = await fetch("http://localhost:5000/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    const newFolder = await res.json();

    setFolders(prev => [newFolder, ...prev]);

    setShowModal(false);

  } catch (err) {
    console.log(err);
  }

};

  const renameFolder = async (id, newName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/folders/${id}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName })
      });

      const updated = await res.json();

      setFolders(prev => 
        prev.map(f => f.id === id ? updated : f)
      );
    }catch (err) {
      console.log(err);
    }
  };

//API Delete folder call
const deleteFolder = async (id) => {
  try {

    await fetch(`http://localhost:5000/api/folders/${id}`, {
      method: "DELETE"
    });
    
    setFolders(prev => prev.filter((f) => f.id !== id));

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="container">
      <h1 className="title">Photo Gallery</h1>
      
      <FolderGrid
         folders={folders}
         openModal={() => setShowModal(true)}
         onRename={renameFolder}
         onDelete={deleteFolder}
      />

      {showModal && (
        <CreateFolderModal
          closeModal={() => setShowModal(false)}
          createFolder={createFolder}
        />
      )}
    </div>
  );
}

export default GalleryHome;