import '../css/login.css'
import Navbar from './navbar';
const Login=()=>{
	const submit=()=>{
		alert("hi")
	}

let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let usernameError = document.getElementById("username-error");
let passwordError = document.getElementById("password-error");
let submitBtn = document.getElementById("submit");
let messageRef = document.getElementById("message-ref");
    return(
		<div className="wrapper">

			<div className="container">

				<input type="text" placeholder="Username" id="username" />
				<input type="password" placeholder="Password" id="password" />
				<button id="submit" onClick={submit}>Submit</button>
				<p id="message-ref">Signed Up Successfully</p>
			</div>
		</div>
    )       
    
}
export default Login