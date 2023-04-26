import { useNavigate } from 'react-router-dom';
import styles from './chat.module.css';
import { useEffect, useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';
import UserCard from '../user_card/UserCard';

function Chat({selectedUser, setSelectedUser, conversation, setConversation}) {

  const [users, setUsers] = useState([]);


  const navigate = useNavigate();
  /* useEffect(()=>{
    axiosPrivate.post("/chat/getall", {userId:1})
      .then((response) => {console.log(response.data.conversation);})
      .catch((error)=>{
        console.log(error.response.status);
        if (error.response.status) {
          navigate("/login");
        }
      })
  }, []); */

  useEffect(() => {
    axiosPrivate.post("/user/getallusers", {userId:1})
      .then((response) => {
        console.log("All users ", response.data.users)
        setUsers(response.data.users);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  /* useEffect(()=>{
    axiosPrivate.get("http://localhost:5000/chat/getall")
        .then((response) => {
            setConversation(response.data.conversation);
            console.log(response.data.conversation);
            // localStorage.setItem("conv", conversation.conv_id);
        }).catch((error) => {
            console.log(error)
            navigate("/login")
        })
}, [navigate]); */

let userDiv = users.length > 0 ? users.map((user) => {
  return (
      <div onClick={() => {
        setSelectedUser(user)
        console.log("Init User: ", user)
        navigate("/chat/main/init");
      }} key={user.email} className={styles.users_container}>
          <div className={ styles.user_card_container }>
            <UserCard user={user} />
          </div>
      </div>
  )
}): null;

return (
    <div className={styles.user_container}>
        <div className={styles.container_2}>
          { userDiv }
            {/* <div className={styles.centered_element}>
                <div className=""></div>
                <div className=""></div>
            </div> 
            <div className=""></div> */}
        </div>
    </div>
  )
}

export default Chat;