/*This is a dot that positions itself on the map It takes an X and Y position to place
itself. It's also passed an Onclick to handle opening and closing the picture that's
attatched to it
*/
export default function MapImageDot({X,Y,onClick}) {
    console.log(X,Y);
    const style =  {
        postition:"Absolute",
        cx:X,
        cy:Y,
        }

  return (
      <circle
        className="Dot"
        style={style}
        onClick={()=>{onclick}}
      />
  );
}
