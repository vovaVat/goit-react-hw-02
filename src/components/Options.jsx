export default function Options({click, total}){

    return(
        <>
          <button onClick={()=> click("good")}>Good</button>
          <button onClick={()=> click("neutral")}>Neutral</button>
          <button onClick={()=> click("bad")}>Bad</button>
          {total > 0 && <button onClick={()=> click("reset")}>Reset</button> }
        </>
    );
}