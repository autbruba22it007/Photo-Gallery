import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadPage from "./UploadPage";

function FolderPage () {
    const {id} = useParams();
    const location = useLocation();
    const folderName = location.state?.folderName || "Folder";
    const navigate = useNavigate();

    return (
        <div className="container">

            {/* <button className="back-btn" onClick={() => navigate(-1)}>← Back</button> */}

                <div className="breadcrumb">
                    <span onClick={() => navigate("/")}>Gallery</span>

                    <span className="divider"> / </span>

                    <span className="current">{folderName}</span>
                </div>
                {/* <h1>{folderName}</h1> */}

            <UploadPage folder={{ id, name: folderName }} />

        </div>
    );
}

export default FolderPage;