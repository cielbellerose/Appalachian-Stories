import {Link} from "react-router-dom"

export default function Post({Posttext,number}){
    console.log(Posttext);
    return(
    <div style={{"display":"flex"}}className="post">
        <div className="post-title">Post {number}</div>
        <div className="post-edit">Edit</div>
    </div>
    );
}