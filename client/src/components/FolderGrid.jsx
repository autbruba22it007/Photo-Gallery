import FolderCard from "./FolderCard";

function FolderGrid({ openModal, folders, onRename, onDelete }) {
  return (
    <div className="grid">

      <FolderCard isCreate onClick={openModal} />

      {folders.map((folder) => (
        <FolderCard
          key={folder.id}
          folder={folder}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default FolderGrid;