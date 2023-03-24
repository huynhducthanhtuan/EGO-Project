import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { refreshPage } from "../../helpers";
import { toast } from "react-toastify";
import "./SignoutModal.css";

function SignoutModal({
  title,
  body = "Body",
  setOpenSignoutModal,
  setOpenProfileModal
}) {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const signOutAction = () => {
    dispatch({ type: "CLEAR" });
    localStorage.clear();
    setOpenSignoutModal(false);
    document.body.style.overflow = "visible";

    toast.success("Sign Out Success");
    navigate("/");
    refreshPage();
  };

  const handleClickCancel = () => {
    setOpenSignoutModal(false);
    setOpenProfileModal(false);
    document.body.style.overflow = "visible";
  };

  const handleClickOK = () => {
    signOutAction();
    setOpenProfileModal(false);
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button onClick={() => handleClickCancel()}>X</button>
      </div>
      {title && (
        <div className="title">
          <h1>{title}</h1>
        </div>
      )}
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

export default SignoutModal;
