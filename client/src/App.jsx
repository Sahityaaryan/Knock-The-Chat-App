import { useEffect, useState , useRef} from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3020");
import './App.css'

function App() {

  

  const messageContainerRef = useRef();

  const[message ,setMessage] = useState("");
  const[nam ,setNam] = useState("");
  const[sender ,setSender] = useState([]);
  
  let renderMessage = document.getElementById("renderMessage");

  
   

  const sendMessage=(e)=>{
    e.preventDefault();
    socket.emit("chat",{message,nam});

    

  }

  useEffect(()=>{
    document.querySelector("#renderMessage").scrollTo({
        top: 0,
        bottom: "23rem",


    })
    //  messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

    socket.on("chat", (payload)=>{

      setSender([...sender,payload]);
      // console.log("this is payload=> ",payload); 
      // renderMessage.scrollTop = renderMessage.scrollHeight;
    });
    

  })

  return (
    <>

      <section id="imgContainer">
                <img src="../public/knock4.jpg" alt="heroPic" />
      </section>

      <section id="container">

        {/* <h1>Knock Knock</h1> */}
        <section id="messageForm">
        <form onSubmit={sendMessage} id="actualform" >

            <div> <label htmlFor="Name"> Name </label>
              <input id='Name' type="text" name="Name" placeholder='Name' onChange={(e) => {
                setNam(e.target.value);
              }} value={nam} /></div>
        

            <div><label htmlFor="Message"> Message </label>
              <input type="text" id='Message' name="Message" placeholder='Message' onChange={(e) => {
                setMessage(e.target.value);
              }} /></div>
         
            <div><input type="submit" value="Submit  " id="submitBtn" /></div>
        
        </form>

       
        </section>

        <section id="renderMessage" ref={messageContainerRef}>

          {sender.map((ele)=>{
            console.log("this is what I received",ele)
            return(
          <div >
          <span id="senderNameMessage">{ele.nam}</span>   <p id="senderPlainMessage">{ele.message}</p>
          </div>
            )
          })}


        </section>

  
      </section>
      <section id="Links">
        
        <ul id="linkTable">
          <li><a href="https://www.linkedin.com/in/sahitya-aryan-51525a250/" target='_blank'><img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-1.svg" alt="LinkedIn" /></a></li>
          <li><a href="https://github.com/Sahityaaryan" target='_blank'><img src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" alt="" /></a></li>
          
        </ul>
      </section>
    </>
  )
}

export default App
