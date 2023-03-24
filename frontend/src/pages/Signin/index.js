import { useState, useEffect } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { signinApi } from "../../apis/user";
import { toast } from "react-toastify";
import { AppLogo } from "../../assets";
import styles from "./Signin.module.css";

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const signin = (values) => {
    signinApi(values)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error(error);
        else {
          localStorage.setItem("signin_token", JSON.stringify(data.token));
          localStorage.setItem("userId", JSON.stringify(data._id));
          localStorage.setItem("role", JSON.stringify(data.role));

          const role = data.role;
          if (role === 0) {
            navigate("/manage/courses");
          } else {
            navigate("/");
          }
          toast.success("Sign In Success");
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const submitForm = (event) => {
    event.preventDefault();
    signin(values);
  };

  useEffect(() => updatePageTitle(PageTitle.SIGNIN), []);

  const renderSignInForm = () => {
    return (
      <form className={styles.form} id="form-1">
        <img src={AppLogo} className={styles.logo}></img>
        <h2 className={styles.headingSignIn}>Sign In</h2>
        <p className={styles.desc}>Signin to start learning today!</p>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username</label>
          <input
            type="text"
            className={styles.formControl}
            placeholder="Enter username"
            onChange={handleChange("username")}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            type="password"
            className={styles.formControl}
            placeholder="Enter password"
            onChange={handleChange("password")}
          />
        </div>

        <div className={styles.formRemind}>
          <div className={styles.formRemember}>
            <Link to="/signup">
              <span
                className={styles.formRememberText}
                style={{ fontSize: "14px" }}
              >
                Sign Up
              </span>
            </Link>
          </div>

          <Link to={"/forgot-password"} className={styles.formForgotPassword}>
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          className={`${styles.formSubmit}`}
          onClick={submitForm}
        >
          Sign in
        </button>
      </form>
    );
  };

  return <div className={styles.main}>{renderSignInForm()}</div>;
}

export default Signin;
