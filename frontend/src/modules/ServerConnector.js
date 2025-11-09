const me = {}

me.serverName = "http://localhost:3000";
me.postUpdateEndpoint = "/api/posts";
me.toPosts = me.serverName + me.postUpdateEndpoint;

/* Allows sending a post update. Takes JSON postdata, as well as an optional
react hook to indicate when done.
*/
me.sendPostToServer = (postdata,setTrueWhenDone) => {
    fetch(me.toPosts, {
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(postdata)
    }).then({
        if (setTrueWhenDone){
            setTrueWhenDone(true);
        }
    })
}


export default me;