import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo, Bg, iphone } from "../assets/index";
import axios from "../api/axios";

const LOGIN_URL = "/accounts/login/";

export default function SignIn(props) {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Home";

  const emailRef = React.useRef();
  const errorRef = React.useRef();

  const [email, setEmail] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const [buttonText, setButtonText] = React.useState("Proceed");
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  React.useEffect(function () {
    emailRef.current.focus();
  }, []);

  React.useEffect(
    function () {
      setErrorMsg("");
    },
    [email, password]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    // set button name to loading
    setButtonText("Processing...");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.data?.api_token;
      const username = response?.data?.data?.id;
      const fullName = response?.data?.data?.name;
      const phone = response?.data?.data?.custom_fields?.phone?.value;
      const role = response?.data?.data?.roles[0].name;
      let roles = [];
      roles.push(role);
      setAuth({ email, accessToken, roles, username, fullName, phone });
      localStorage.setItem("accessToken", accessToken);
      setPassword("");
      setSuccess(true);
      setButtonText("Proceed");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response?.status === 500) {
        setErrorMsg("Oops! an error occurred!");
      } else {
        setErrorMsg(error.response?.data["message"]);
      }
      errorRef.current.focus();
      setButtonText("Proceed");
    }
  }

  return (
    <div className="flex flex-row h-screen w-full bg-black overflow-y-hidden">
      <div className="hidden sm:block authpage relative w-[50%] py-6 px-6">
        <Link to="/">
          <img src={Logo} alt="" className="w-[8rem]" />
        </Link>
        <h2 className="text-[20px] text-Lightgrey mt-[10rem] mb-[1rem]">
          Empowering Web3 developers to build the apps of their dreams
        </h2>
        <p className="text-grey">
          Our solutions include wallet as a service solution (Custodial and
          Non-Custodial for wallet creation, send and receive), Defi yield
          Interoperability solution and decentralized peer - 2 - peer
          infrastructure.
        </p>
        <img src={iphone} alt="" className="absolute bottom-0 left-[20px]" />
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="bg-darkestGrey mx-auto max-w-[400px] w-full  rounded-lg ">
          <form
            onSubmit={handleSubmit}
            className="max-w-[400px] w-full mx-auto bg-darkestGrey p-8 px-8 rounded-lg"
          >
            <h2 className="text-[20px] mb-6 text-white font-poppins text-center">
              Login to your account
            </h2>
            <p
              ref={errorRef}
              className={
                errorMsg
                  ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded relative"
                  : "offscreen"
              }
              aria-live="assertive"
              role="alert"
            >
              {errorMsg}
            </p>
            <div className="flex flex-col text-white py-2">
              <label>Email</label>
              <input
                className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
                type="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="johndoe@blockterium.com"
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
            </div>
            <div className="flex flex-col text-white py-2">
              <label>Password</label>
              <input
                className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="**********"
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
            </div>
            <div className="flex justify-between text-white py-2">
              <p className="flex items-center text-[12px]">
                <input className="mr-2" type="checkbox" /> Stay Logged in
              </p>
              <p className="cursor-pointe text-[12px]">
                <Link to="/reset-password">Forgot Password</Link>
              </p>
            </div>
            <button
              className="w-full my-5 py-2 BlueGradient rounded-lg hover:shadow-blue-500/50 text-white font-semibold"
              type="submit"
            >
              {buttonText}
            </button>
          </form>
          <h2 className="text-white font-poppins text-center py-[5px] cursor-pointer">
            <Link to="/sign-up" className="">
              Don't have an account?
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { LoginImg } from "../assets/index";
// import useAuth from "../hooks/useAuth";
// import axios from "../api/axios";

// const LOGIN_URL = "/accounts/login/";

// const SignIn = () => {
//   const { setAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const emailRef = React.useRef();
//   const errorRef = React.useRef();

//   const [email, setEmail] = React.useState("");
//   const [emailFocus, setEmailFocus] = React.useState(false);
//   const [password, setPassword] = React.useState("");
//   const [errorMsg, setErrorMsg] = React.useState("");
//   const [success, setSuccess] = React.useState(false);
//   const [buttonText, setButtonText] = React.useState("Proceed");
//   const [passwordFocus, setPasswordFocus] = React.useState(false);

//   React.useEffect(function () {
//     emailRef.current.focus();
//   }, []);

//   React.useEffect(
//     function () {
//       setErrorMsg("");
//     },
//     [email, password]
//   );

//   async function handleSubmit(event) {
//     event.preventDefault();

//     // set button name to loading
//     setButtonText("Processing...");
//   }
//   return (
//     <div className="flex flex-row h-screen w-full bg-black overflow-y-hidden">
//       <div className="hidden sm:block bg-darkPurple w-[50vw] ">
//         <img
//           className="w-[50vw] lg:w-[40vw] h-[100vh] xsm:h-[900px] bg:h-[100vh]"
//           src={LoginImg}
//           alt=""
//         />
//       </div>

// <div className="flex flex-col justify-center w-full">
//   <div className="bg-darkestGrey mx-auto max-w-[400px] w-full  rounded-lg mt-12 p-6">
//     <h2 className="text-xl text-white font-semibold ">
//       Now login to your account
//     </h2>
//     <p className="text-grey text-[14px] my-[12px]">
//       Blockterium is the fastest way to build, test and run blockchain
//       apps. We offer the most flexible platform for developers to turn
//       their blockchain ideas into reality fast.
//     </p>

//     <form
//       onSubmit={handleSubmit}
//       className="max-w-[400px] w-full mx-auto bg-primary p-3 px-8 rounded-lg"
//     >
//       <div className="flex flex-col text-white py-2">
//         <label>Email</label>
//         <input
//           className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
//           type="email"
//           autoComplete="off"
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="blinks@blockterium.com"
//           aria-describedby="emailnote"
//           onFocus={() => setEmailFocus(true)}
//           onBlur={() => setEmailFocus(false)}
//           required
//         />
//       </div>
//       <div className="flex flex-col text-white py-2">
//         <label>Password</label>
//         <input
//           className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="**********"
//           aria-describedby="pwdnote"
//           onFocus={() => setPasswordFocus(true)}
//           onBlur={() => setPasswordFocus(false)}
//           required
//         />
//       </div>
//       <div className="flex justify-between text-white py-2">
//         <p className="flex items-center text-[12px]">
//           <input className="mr-2" type="checkbox" /> Stay Logged in
//         </p>
//         <p className="cursor-pointe text-[12px]">
//           <Link to="/reset-password">Forgot Password</Link>
//         </p>
//       </div>
//       <button
//         className="w-full my-5 py-2 BlueGradient rounded-lg hover:shadow-blue-500/50 text-white font-semibold"
//         type="submit"
//       >
//         Proceed
//       </button>
//     </form>
//     <h2 className="text-white font-poppins text-center my-[2px] cursor-pointer">
//       <Link to="/sign-up">Don't have an account?</Link>
//     </h2>
//   </div>
// </div>
//     </div>
//   );
// };

// export default SignIn;

{
  //  <form
  //         onSubmit={handleSubmit}
  //         className="max-w-[400px] w-full mx-auto bg-primary p-8 px-8 rounded-lg"
  //       >
  //         <h2 className="text-[15px] text-white font-poppins text-center">
  //           LOGIN
  //         </h2>
  //         <p
  //           ref={errorRef}
  //           className={
  //             errorMsg
  //               ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded relative"
  //               : "offscreen"
  //           }
  //           aria-live="assertive"
  //           role="alert"
  //         >
  //           {errorMsg}
  //         </p>
  //         <div className="flex flex-col text-white py-2">
  //           <label>Email</label>
  //           <input
  //             className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
  //             type="email"
  //             ref={emailRef}
  //             autoComplete="off"
  //             onChange={(e) => setEmail(e.target.value)}
  //             value={email}
  //             placeholder="johndoe@rack.best"
  //             aria-describedby="emailnote"
  //             onFocus={() => setEmailFocus(true)}
  //             onBlur={() => setEmailFocus(false)}
  //             required
  //           />
  //         </div>
  //         <div className="flex flex-col text-white py-2">
  //           <label>Password</label>
  //           <input
  //             className="rounded-lg bg-gray-800 mt-2 p-2 focus:border-secondary focus:bg-gray-800 focus:outline-none"
  //             type="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //             value={password}
  //             placeholder="**********"
  //             aria-describedby="pwdnote"
  //             onFocus={() => setPasswordFocus(true)}
  //             onBlur={() => setPasswordFocus(false)}
  //             required
  //           />
  //         </div>
  //         <div className="flex justify-between text-white py-2">
  //           <p className="flex items-center text-[12px]">
  //             <input className="mr-2" type="checkbox" /> Stay Logged in
  //           </p>
  //           <p className="cursor-pointe text-[12px]">
  //             <Link to="/reset-password">Forgot Password</Link>
  //           </p>
  //         </div>
  //         <button
  //           className="w-full my-5 py-2 bg-secondary rounded-lg hover:shadow-blue-500/50 text-white font-semibold"
  //           type="submit"
  //         >
  //           {buttonText}
  //         </button>
  //       </form>
  //       <h2 className="text-white font-poppins text-center py-[40px] cursor-pointer">
  //         <Link to="/sign-up">Don't have an account?</Link>
  //       </h2>
}
