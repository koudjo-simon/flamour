import styles from "./userCard.module.css"

const UserCard = ({user}) => {

    return (
      <div className={styles.user_card}>
        <div className={styles.photo_view}>
          <img src={user.photo_profil} alt="user profile" />
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>
            {user.nom} {user.prenom}
          </div>
          <div className={styles.user_location}>
            {user.pays}, {user.ville}
          </div>
          <div className={styles.user_age}>{user.age} ans</div>
        </div>
        <div className={styles.message_icon}>
          <button className={styles.inbox_btn}>Message</button>
        </div>
      </div>
    );
  }
  
  export default UserCard;