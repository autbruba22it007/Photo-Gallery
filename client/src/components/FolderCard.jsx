import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FolderCard({ isCreate, onClick, folder, onRename, onDelete}) {

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(folder?.name || "");  
  const navigate = useNavigate();

  if (isCreate) {
    return (
      <div className="folder-card create-card" onClick={onClick}>
        <div className="plus">
          <i className="fa-solid fa-plus"></i>
        </div>
        <p>Create Folder</p>
      </div>
    );
  }

    return (
      <div className="folder-card real-folder" onClick={() => navigate(`/folder/${folder.id}`, { state: { folderName: folder.name}})}>
    
        <div 
            className="delete-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(folder.id);  
            }}
          >
          <i className="fa-solid fa-trash"></i>
        </div>
    
        <div className="folder-icon-area">
          <i className="fa-solid fa-folder"></i>
        </div>
    
        <div className="folder-footer">

            {isEditing ? (
              <input
                className="rename-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => {
                  onRename(folder.id, newName);
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onRename(folder.id, newName);
                    setIsEditing(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <span className="folder-name">{folder.name}</span>
            
                <button
                  className="edit-btn"
                  onClick={(e) => { e.stopPropagation(); setIsEditing(true);}}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </>
            )}

          </div>
    
      </div>
    );
}

export default FolderCard;