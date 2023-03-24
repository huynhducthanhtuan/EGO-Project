import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTestApi } from "../../apis/test";
import { GrEdit } from "react-icons/gr";
import { IoMdTimer } from "react-icons/io";
import { FiTarget } from "react-icons/fi";
import { MdPublish, MdDelete } from "react-icons/md";
import DeleteModal from "../../modals/DeleteModal";
import styles from "./Test.module.css";

function Test({ test, index }) {
  const testId = test._id;
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (role === 1) {
      navigate(`/tests/${testId}`);
    } else {
      navigate(`/manage/tests/${testId}`);
    }
  };

  return (
    <div key={index} className={styles.listTest}>
      <div className={styles.test__right}>
        <h3 className="test__name" onClick={handleClick}>
          {test.description}
        </h3>
        <div className={styles.test__cost}>
          <IoMdTimer />
          <b>Time:</b> {test.timeLimit} minutes
        </div>
        <div className={styles.test__cost}>
          <FiTarget />
          <b>Score:</b> {test.score}
        </div>
        {role === 0 && (
          <div>
            <div className={styles.test__cost}>
              <MdPublish />
              <b>Created At:</b> {test.createdAt.slice(0, 10)}{" "}
              {test.createdAt.slice(11, 19)}
            </div>
            <GrEdit
              className={styles.editIcon}
              onClick={() => {
                navigate(`/tests/update/${test._id}`);
              }}
            />
            <MdDelete
              className={styles.deleteIcon}
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            />
            {openDeleteModal && (
              <DeleteModal
                body="Are you sure to delete this test?"
                setOpenDeleteModal={setOpenDeleteModal}
                deleteApi={deleteTestApi}
                deleteItemId={test._id}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
