import { useMutation } from "@tanstack/react-query";
import { Alert, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
// import { UserContext } from "../context/userContext";
import Login from "./Login";

export default function Register(show, handleClose) {
  //   const navigate = useNavigate();
  //   const [state, dispatch] = useContext(UserContext);
  const [alert, setAlert] = useState();
  const [showLogin, setShowLogin] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const body = JSON.stringify(form);
      const response = await API.post("/register", body);

      if (response.status === 200) {
        setAlert(
          <Alert color="success">
            <span>Register Success</span>
          </Alert>
        );
      }
    } catch (error) {
      setAlert(
        <Alert color="danger">
          <span>Failed</span>
        </Alert>
      );

      console.log(error);
    }
  });

  // const handleShowLogin = () => {
  //   setShowLogin(true);
  // };

  return (
    <div>
      <Modal show={show} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="p-0">
            <h1 className="text-xl font-semibold text-[#2FC4B2">Register</h1>
            {alert}
            <form
              className="flex flex-col gap-4 mt-6"
              onSubmit={(e) => handleSubmit.mutate(e)}
            >
              <div>
                <TextInput
                  name="fullname"
                  type="text"
                  placeholder="Fullname"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextInput
                  name="email"
                  type="text"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 mt-3 rounded-md text-white font-semibold bg-[#2FC4B2] text-md lg:text-lg"
              >
                Register
              </button>
            </form>
            {/* <p className="text-md text-center mt-4">
              Don't have an account? Click
              <p
                className="font-semibold cursor-pointer"
                onClick={handleShowLogin}
              >
                Here
              </p>
              <Login show={showLogin} />
            </p> */}
            <p className="text-xs text-center mt-4">
              Don't have an account ? Klik Here
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
