import { toast } from "react-toastify";
import { refreshPage } from "../../helpers";
import "./DeleteModal.module.css";

function DeleteModal({
  body = "Body",
  setOpenDeleteModal,
  deleteApi,
  deleteItemId
}) {
  const handleClickCancel = () => {
    setOpenDeleteModal(false);
    document.body.style.overflow = "visible";
  };

  const handleClickOK = () => {
    deleteApi(deleteItemId)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Delete Failed");
        else {
          toast.success("Delete Success");
          setOpenDeleteModal(false);
          document.body.style.overflow = "visible";
          refreshPage();
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button onClick={() => handleClickCancel()}>X</button>
      </div>
      <div className="body">
        <p>{body}</p>
      </div>
      <div className="footer">
        <button onClick={() => handleClickCancel()} id="cancelBtn">
          Cancel
        </button>
        <button onClick={() => handleClickOK()}>OK</button>
      </div>
    </div>
  );
}

export default DeleteModal;
