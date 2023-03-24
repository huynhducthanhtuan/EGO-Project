import { useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteLessonApi } from "../../apis/lesson";
import DeleteModal from "../../modals/DeleteModal";
import LessonVideo from "./LessonVideo";
import styles from "./Lesson.module.css";

function Lesson({ lesson, index }) {
  const navigate = useNavigate();
  const lessonId = lesson._id;
  const role = JSON.parse(localStorage.getItem("role"));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div key={index} className={styles.listLesson}>
      <div className={styles.lesson__left}>
        <LessonVideo videoId={lesson.videoId} />
      </div>
      <div className={styles.lesson__right}>
        <h3
          className="lesson__name"
          onClick={() => navigate(`/lessons/${lessonId}`)}
        >
          {lesson.name}
        </h3>
        <div className={styles.lesson__cost}>
          <BsYoutube /> {lesson.videoId}
        </div>
        <p className={styles.lesson__description}>
          <MdDescription />
          {lesson.description}
        </p>
        {role === 0 && (
          <div>
            <GrEdit
              className={styles.editIcon}
              onClick={() => {
                navigate(`/lessons/update/${lesson._id}`);
              }}
            />
            <MdDelete
              className={styles.deleteIcon}
              onClick={() => setOpenDeleteModal(!openDeleteModal)}
            />
            <button
              className={styles.listLessonsBtn}
              onClick={() => {
                navigate(`/manage/tests?lessonId=${lesson._id}`);
              }}
            >
              List Tests
            </button>
            {openDeleteModal && (
              <DeleteModal
                body="Are you sure to delete this lesson?"
                setOpenDeleteModal={setOpenDeleteModal}
                deleteApi={deleteLessonApi}
                deleteItemId={lesson._id}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson;
