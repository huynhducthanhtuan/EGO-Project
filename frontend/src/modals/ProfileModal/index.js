import { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import SignoutModal from "../SignoutModal";
import "./ProfileModal.css";

function ProfileModal({ setOpenProfileModal }) {
  const [openSignoutModal, setOpenSignoutModal] = useState(false);

  return (
    <div className="modal-container">
      <div className="modal-body-part">
        <Link to="#" className="modal-body-item">
          <CgProfile />
          <span>Profile</span>
        </Link>
        <Link to="#" className="modal-body-item">
          <RiLockPasswordLine />
          <span>Change password</span>
        </Link>
        <div
          className="modal-body-item"
          onClick={(e) => setOpenSignoutModal(!openSignoutModal)}
        >
          <IoLogOutOutline />
          <span>Sign out</span>
        </div>
      </div>
      {openSignoutModal && (
        <SignoutModal
          body="Are you sure you want to sign out?"
          setOpenSignoutModal={setOpenSignoutModal}
          setOpenProfileModal={setOpenProfileModal}
        />
      )}
    </div>
  );
}

export default ProfileModal;
