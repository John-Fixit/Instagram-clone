import React from "react";
import style from "./style.css";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import applePro from "../Images/apple.PNG";
import playStore from "../Images/plaayStore.PNG";
import logo from "../Images/word.PNG";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
function Signin() {
  const navigate = useNavigate();
  const URI = "http://localhost:4000/user/signin";
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  const [disableBtn, setdisableBtn] = useState(false);
  const [isComing, setisComing] = useState(false);
  const formik = useFormik({
    initialValues: {
      useraddress: "",
      password: "",
    },
    onSubmit: (values) => {
      let email = values.useraddress;
      let password = values.password;
      let signInReq = { email, password };
      setisComing(true);
      setdisableBtn(true)
      axios
        .post(URI, signInReq)
        .then((res) => {
          let feedBack = res.data;
          console.log(res)
          setisComing(false);
          setdisableBtn(false)
            if (feedBack.status) {
              const token = res.data.token;
              localStorage.token = JSON.stringify(token);
              navigate("/homepage/");
            } else {
              setstatus(feedBack.status);
              setmessage(feedBack.message);
            }
        })
        .catch((err) => {
          setisComing(false);
          setmessage(err.message);
          setdisableBtn(false)
        });
    },
    validationSchema: yup.object({
      useraddress: yup.string().required(`This field is required`),
      password: yup.string().required(`This feild is required`),
    }),
  });

  return (
    <>
      <div className="container">
        <div className="row my-2">
          <div className="col-md-4">
            <div className="card-img-non"></div>
          </div>
          <div className="col-md-8">
            <div className="col-lg-6 col-md-12">
              <div className="card h-100 px-3">
                <h3 className="text-center pt-3">
                  <img src={logo} alt="loading" />
                </h3>
                <div className="text-center">
                    {status ? (
                      ""
                    ) : (
                      <small className="text-danger">{message}</small>
                    )}
                  </div>
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="form-floating">
                    <input
                      type="text"
                      name="useraddress"
                      className="form-control bg-light mt-2"
                      placeholder="Phone number, username, or email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="" className="text-muted">
                      Email
                    </label>
                  </div>
                  {formik.touched.useraddress ? (
                    <small className="text-danger">
                      {formik.errors.useraddress}
                    </small>
                  ) : (
                    " "
                  )}
                  <div className="form-floating">
                    <input
                      type="password"
                      name="password"
                      className="form-control bg-light  mt-2"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="" className="text-muted">
                      Password
                    </label>
                  </div>
                  {formik.touched.password ? (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  ) : (
                    " "
                  )}
                  
                  <button
                    className="btn btn-primary text-light text-center mt-3 w-100"
                    type="submit"
                    disabled={disableBtn}
                  >
                    {isComing ? (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      `Log in`
                    )}
                  </button>
                </form>
                <div className="row mt-2 px-3">
                  <p className=" mt-2 border-top col-5"></p>
                  <p className="col-2 text-muted">OR</p>
                  <p className=" mt-2 border-top col-5"></p>
                </div>

                <Link
                  to="*"
                  className="text-decoration-none text-center"
                  style={{ fontSize: "2.3vh", color: "#385185" }}
                >
                  <FaFacebookSquare size="3vh" />
                  Log in with facebook
                </Link>
                <Link
                  to="*"
                  className="text-decoration-none text-center mt-4 pb-3"
                  style={{ fontSize: "1.8vh", color: "#385185" }}
                >
                  Forgot Password?
                </Link>
              </div>
              <p className="border text-center mt-3 py-3">
                Don't you have an account?{" "}
                <Link to="/signup" className="opacity-50 text-decoration-none">
                  Sign up
                </Link>
              </p>
              <p className="text-center">Get the app</p>
              <div className="row px-2">
                <div className="col-6 px-5">
                  <img src={applePro} alt="loading" />
                </div>
                <div className="col-6 px-2">
                  <img src={playStore} alt="loading" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
