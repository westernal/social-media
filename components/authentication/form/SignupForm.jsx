import { toast } from "react-toastify";

const SignupForm = ({ signup, changeLoader }) => {
  function checkInputs(e) {
    e.preventDefault();
    changeLoader("on");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const username = document.getElementById("username");
    const email = document.getElementById("email");

    let correctedUsername = username.value.replace(/\s+/g, "");

    if (username.value == "") {
      toast.error("Username must be included!");
      changeLoader("off");
      return;
    }

    if (email.value == "") {
      toast.error("Email must be included!");
      changeLoader("off");
      return;
    }

    if (!email.value.includes("@")) {
      toast.error("Enter a valid Email!");
      changeLoader("off");
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be more than 6 characters!");
      changeLoader("off");
      return;
    }

    if (password.value !== confirmPassword.value) {
      toast.error("Password must be equal to repeat password!");
      changeLoader("off");
      return;
    } else
      signup(
        correctedUsername.toLowerCase(),
        email.value.toLowerCase(),
        password.value
      );
  }
  return (
    <form onSubmit={checkInputs} autoComplete="off">
      <div className="form-inputs">
        <input
          type="text"
          placeholder="Username"
          id="username"
          autoComplete={"off"}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          autoComplete={"off"}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          autoComplete={"off"}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm-password"
          autoComplete={"off"}
        />
      </div>

      <div className="flex">
        <button className="btn" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
