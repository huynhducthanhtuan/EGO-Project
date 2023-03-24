import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { signupApi } from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SigninBackgroundImage } from "../../assets";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    username: "",
    role: 1,
    email: "",
    password: "",
    error: "",
    success: false
  });
  const { name, username, role, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const signup = async (data) => {
    signupApi(data)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Sign Up Failed");
        else {
          toast.success("Sign Up Success");
          navigate("/signin");
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newUser = { name, username, role, email, password };
    signup(newUser);
  };

  const renderSignupForm = () => {
    return (
      <form className={styles.form} id="form-1">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: success ? "" : "none" }}
        >
          Sign up success. <Link to="/signin">Sign In</Link>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.flex}>
            <p className={styles.formLabel}>Name</p>
            <p className={styles.formForce}>*</p>
          </div>
          <input
            className={styles.formControl}
            type="text"
            onChange={handleChange("name")}
          />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.flex}>
            <p className={styles.formLabel}>Username</p>
            <p className={styles.formForce}>*</p>
          </div>
          <input
            className={styles.formControl}
            type="text"
            onChange={handleChange("username")}
          />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.flex}>
            <p className={styles.formLabel}>Email</p>
            <p className={styles.formForce}>*</p>
          </div>
          <input
            className={styles.formControl}
            type="email"
            onChange={handleChange("email")}
          />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.flex}>
            <p className={styles.formLabel}>Password</p>
            <p className={styles.formForce}>*</p>
          </div>
          <input
            className={styles.formControl}
            type="password"
            onChange={handleChange("password")}
          />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.flex}>
            <p className={styles.formLabel}>Role</p>
            <p className={styles.formForce}>*</p>
          </div>
          <select
            className={styles.formControl}
            onChange={handleChange("role")}
          >
            <option value={1}>Leaner</option>
            <option value={0}>Teacher</option>
          </select>
        </div>
        <button
          type="button"
          className={`${styles.formSubmit}`}
          onClick={(e) => submitForm(e)}
        >
          Sign up
        </button>
      </form>
    );
  };

  useEffect(() => updatePageTitle(PageTitle.SIGNUP), []);

  return (
    <section className={`mt-4 ${styles.flex}`}>
      <div>
        <h2 className={styles.textSignUp}>Sign Up</h2>
        <div className="mt-4">{renderSignupForm()}</div>
      </div>
      <div>
        <img
          src={SigninBackgroundImage}
          className={styles.imageSignUp}
          alt=""
        ></img>
        <Link to="/signin">
          <p className={styles.link}>Already have account? Sign in</p>
        </Link>
      </div>
    </section>
  );
}

export default Signup;
