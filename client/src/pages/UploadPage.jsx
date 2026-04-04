import { useState, useEffect } from "react";

function UploadPage({ folder }) {

  const [preview, setPreview] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingId, setEditingId] = useState(null)
  const [replaceId, setReplaceId] = useState(null)

  const [images, setImages] = useState([]);
  useEffect(() => {
  fetch(`https://photo-gallery-backend-1605.onrender.com/api/images/${folder.id}`)
    .then(res => res.json())
    .then(data => setImages(data))
    .catch(err => console.log(err));
}, [folder.id]);

  const nextImage = () => {
   setActiveIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
   );
};

const prevImage = () => {
   setActiveIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
   );
};

const handleDelete = async (id) => {
  try {
    await fetch(`https://photo-gallery-backend-1605.onrender.com/api/images/${id}`, {
      method: "DELETE",
    });

    setImages(prev => prev.filter(img => img.id !== id));
    setEditingId(null);

  } catch (err) {
    console.log("Delete error:", err);
  }
}

const handleReplaceClick = (id) => {
  setReplaceId(id)
  document.getElementById("fileInput").click()
}
  // const handleUpload = (e) => {

  //   const files = Array.from(e.target.files)

  //   if (!files.length) return

  //   const newUrl = URL.createObjectURL(files[0])

  //   if (replaceId) {

  //   setImages(prev =>
  //     prev.map(img =>
  //       img.id === replaceId
  //         ? { ...img, url: newUrl }
  //         : img
  //     )
  //   )

  //   setReplaceId(null)
  //   setEditingId(null)

  // } else {
  //   const newImages = files.map(file => ({
  //     id: Date.now() + Math.random(),
  //     url: URL.createObjectURL(file)
  //   }))

  //   setImages(prev => [...prev, ...newImages]);
  // }
  // }

  const handleEdit = (id) => {
  setEditingId(id)
  }

  const handleUpload = async (e) => { 
  const files = Array.from(e.target.files);
  if (!files.length) return;

  if (replaceId) {
  const file = files[0]; // only replace with first file

  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder_id", folder.id);

  try {
    // 1. Upload new image to backend
    const res = await fetch("https://photo-gallery-backend-1605.onrender.com/api/images", {
      method: "POST",
      body: formData,
    });
    const newImage = await res.json();

    // 2. Delete old image from backend
    await fetch(`https://photo-gallery-backend-1605.onrender.com/api/images/${replaceId}`, {
      method: "DELETE",
    });

    // 3. Swap in state
    setImages(prev =>
      prev.map(img => img.id === replaceId ? newImage : img)
    );

    setReplaceId(null);
    setEditingId(null);

  } catch (err) {
    console.log("Replace error:", err);
  }

  e.target.value = "";
  return;
}

  // Upload each file to the backend
  for (const file of files) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder_id", folder.id);

    try {
      const res = await fetch("https://photo-gallery-backend-1605.onrender.com/api/images", {
        method: "POST",
        body: formData,
      });

      const newImage = await res.json();
      setImages(prev => [newImage, ...prev]);

    } catch (err) {
      console.log("Upload error:", err);
    }
  }

  // Reset input so the same file can be re-selected
  e.target.value = "";
};

  return (
  <div>

    <h1 className="title">{folder.name}</h1>

    <div className="grid">

      {/* Upload Card */}
      <div
        className="upload-card"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <div className="plus">
          <i className="fa-solid fa-plus"></i>
        </div>
        <p>Upload Files</p>
      </div>

      {/* Image Cards */}
      {images.map((img, index) => (
        <div className="image-card" key={img.id} onClick={() => { if (editingId === img.id) return; setActiveIndex(index);}}>
          <img src={`https://photo-gallery-backend-1605.onrender.com${img.filepath}`} alt="images" />

          {editingId !== img.id && (
          <div className="image-edit-btn" onClick={(e) => {e.stopPropagation();
              handleEdit(img.id);}}>
              <i className="fa-solid fa-pen"></i>
            </div>
            )}
            
          <i className="fa-solid fa-eye eye-icon"></i>

           {editingId === img.id && (
         <div 
            className="image-action-bar"
            onClick={(e)=> e.stopPropagation()}
         >
          <i className="fa-solid fa-camera-rotate" style={{color: "rgb(0, 0, 0)"}} onClick={() => handleReplaceClick(img.id)}></i>
            
            <i 
               className="fa-solid fa-trash"
               onClick={()=>handleDelete(img.id)}
            ></i>

         </div>
      )}
        </div>
      ))}

    </div>

    {preview && (
        <div
          className="preview-modal"
          onClick={() => setPreview(null)}
        >
            <img src={preview} />
        </div>
      )}

      {activeIndex !== null && (
         <div className="viewer-overlay">
        
            <button className="nav left" onClick={prevImage}>
               <i className="fa-solid fa-circle-left" style={{color: "rgb(116, 192, 252)"}}></i>
            </button>
      
            <img
               src={`https://photo-gallery-backend-1605.onrender.com${images[activeIndex].filepath}`}
               className="viewer-image"
            />

            <button className="nav right" onClick={nextImage}>
               <i className="fa-solid fa-circle-right" style= {{color: "rgb(116, 192, 252)"}}></i>
            </button>
      
            <button
               className="close-viewer"
               onClick={() => setActiveIndex(null)}
            >
               <i className="fa-brands fa-xbox" style={{color: "rgb(116, 192, 252)"}}></i>
            </button>
      
         </div>
      )}
    
    {/* Hidden Input */}
    <input
      type="file"
      multiple
      accept="image/*"
      id="fileInput"
      style={{ display: "none" }}
      onChange={handleUpload}
    />

  </div>
  
);
}

export default UploadPage;