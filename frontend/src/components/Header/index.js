import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../auth/index";
import { DEFAULT_USER_AVATAR } from "../../constants";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";
import ProfileModal from "../../modals/ProfileModal";

const Header = () => {
  const role = JSON.parse(localStorage.getItem("role"));
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleClickAvatarImage = () => {
    document.body.style.overflow = openProfileModal ? "visible" : "hidden";
    setOpenProfileModal(!openProfileModal);
  };

  const renderLearnerHeader = () => {
    return (
      <div className={styles.headerButton}>
        <Link to="/">
          <span className={styles.button}>Home</span>
        </Link>
        <Link to="/courses/my-courses">
          <span className={styles.button}>My courses</span>
        </Link>
      </div>
    );
  };

  const renderList = () => {
    if (isAuth()) {
      return (
        <div className={`${styles.headerRightFrame} d-flex`}>
          <div className={`${styles.headerButton} ml-4`}>
            <div onClick={handleClickAvatarImage}>
              <img
                alt=""
                src={DEFAULT_USER_AVATAR}
                className={styles.avatarImage}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.headerButton}>
          <Link to="/signup">
            <button className={styles.button}>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className={styles.button}>Sign In</button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      {openProfileModal && (
        <ProfileModal setOpenProfileModal={setOpenProfileModal} />
      )}

      <header className={`container ${styles.header}`}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <img alt="" src={logo} className={styles.logoImage}/>
          </div>
        </Link>
        {role === 1 && <div>{renderLearnerHeader()}</div>}
        {renderList()}
      </header>
    </div>
  );
};

export default Header;
