
import {Link ,resolvePath,useMatch , useResolvedPath} from "react-router-dom"

export default function Navbar(){
    
    return(
        <nav className="nav">
            <Link to="/"className="site-title">
                Site 
            </Link>
            <ul>
                <CustomLink to="/showmember">Show Member</CustomLink>
                <CustomLink to="/adduser">Add Users</CustomLink>
                <CustomLink to="/deletegroup">Delete Group</CustomLink>
             
              
                
            </ul>
        </nav>
    )
}

function CustomLink({to,children,...props}){
    const {pathname} =  useResolvedPath(to)
    const isActive = useMatch({path: pathname , end: true})
    return(
        
        <li className ={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
                </Link>
        </li>
    )
}