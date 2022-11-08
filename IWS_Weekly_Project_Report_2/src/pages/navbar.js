import '../css/navbar.css'
export default function Navbar(){
    return <nav className="nav" >
            <a href="/" className="site-title">Site Name</a>
            <ul>
                <li className="active"> <a href="/signup">Signup</a></li>
                <li> <a href="/login">Login</a></li>

            </ul>
             </nav>
}