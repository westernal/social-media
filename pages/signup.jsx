import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../requests/API";
import Head from "next/head";

const SignUp = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function signup(username, email, password) {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      var result = await API(option, "api/users/signup");
    } catch (error) {
      toast.error("Server Error! Please try again.");
      SetLoader(false);
    }

    if (result && result.status == 201) {
      localStorage.setItem("token", result.data.token);
      toast.success(`Welcome, ${username}!`);
      router.push("/home");
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  function checkInputs(e) {
    e.preventDefault();
    SetLoader(true);
    const password = document.getElementById("password");
    const rpassword = document.getElementById("rpassword");
    const username = document.getElementById("username");
    const email = document.getElementById("email");

    let correctedUsername = username.value.replace(/\s+/g, "");

    if (username.value == "") {
      toast.error("Username must be included!");
      SetLoader(false);
      return;
    }

    if (email.value == "") {
      toast.error("Email must be included!");
      SetLoader(false);
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
      return;
    }

    if (password.value !== rpassword.value) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
      return;
    } else signup(correctedUsername.toLowerCase(), email.value, password.value);
  }

  return (
    <div className="flex">
      <Head>
        <title>Signup - Westernal</title>
      </Head>
      <div className="auth-form">
        <p id="login-logo">W</p>
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}
        <form onSubmit={checkInputs} autoComplete="off">
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Username"
              id="username"
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="rpassword"
              autoComplete="off"
            />
          </div>
          <div className="flex">
            <button className="btn" type="submit">
              Signup
            </button>
          </div>
        </form>

        <div className="flex">
          <hr /> OR <hr />
        </div>

        <div className="flex">
          <p>Have an account?</p>
          <Link href={"/"}>
            <a aria-label="signup">login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
