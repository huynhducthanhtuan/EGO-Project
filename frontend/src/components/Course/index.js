import { useState, Fragment } from "react";
import { ImPriceTags } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteCourseApi } from "../../apis/course";
import DeleteModal from "../../modals/DeleteModal";
import styles from "./Course.module.css";

function Course({ course, index, type = "register" }) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div key={index} className={styles.listCourse}>
      <div className={styles.course__left}>
        <img className={styles.itemImage} src={course.thumbnail} alt="" />
      </div>
      <div className={styles.course__right}>
        <h3 className="course__name">{course.name}</h3>
        <div className={styles.course__cost}>
          <ImPriceTags /> {course.cost}
        </div>
        <p className={styles.course__description}>{course.description}</p>
        {type === "register" ? (
          <button
            className={styles.registerButton}
            onClick={() => {
              navigate(`/courses/${course._id}`);
            }}
            style={{ background: "#adc8e0" }}
          >
            Register Now
          </button>
        ) : type === "learn" ? (
          <button
            className={styles.continueLearnButton}
            onClick={() => {
              navigate(`/courses/${course._id}`);
            }}
          >
            Continue Learning
          </button>
        ) : (
          <Fragment>
            <GrEdit
              className={styles.editIcon}
              onClick={() => {
                navigate(`/courses/update/${course._id}`);
              }}
            />
            <MdDelete
              className={styles.deleteIcon}
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            />
            <button
              className={styles.listLessonsBtn}
              onClick={() => {
                navigate(`/manage/lessons?courseId=${course._id}`);
              }}
            >
              List Lessons
            </button>
            {openDeleteModal && (
              <DeleteModal
                body="Are you sure to delete this course?"
                setOpenDeleteModal={setOpenDeleteModal}
                deleteApi={deleteCourseApi}
                deleteItemId={course._id}
              />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default Course;
