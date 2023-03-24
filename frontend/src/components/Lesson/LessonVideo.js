import styles from "./Lesson.module.css";

const LessonVideo = ({ videoId }) => {
  return (
    <iframe
      className={styles.lessonVideo}
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
    ></iframe>
  );
};

export default LessonVideo;
