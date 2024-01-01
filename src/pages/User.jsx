import { useState } from "react";
import ChangePass from "../ui/ChangePass";
import styles from "./User.module.scss";
import { useUpdateAvatar } from "../api/ApiHooks";
import testpfp from "../assets/testpfp.jpg";

function User({ user }) {
  const [avatar, setAvatar] = useState(null);
  const { updateAvatar, isUpdatingAvatar } = useUpdateAvatar();

  const userId = user.id;
  //the avatar is saved as a image link of supabase storage, its filename is item after last "/" of the link
  const currentUserAvatar = user.user_metadata.avatar.split("/").at(-1);

  function handleUploadAvatar() {
    // We need current user avatar to remove the old one from storage when we upload the new one
    updateAvatar({ avatar, userId, currentUserAvatar });
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.nick}>
          Welcome to your profile {user.user_metadata.username}
        </p>
        <div className={styles.pfp}>
          <img
            src={
              user.user_metadata.avatar.length > 1
                ? user.user_metadata.avatar
                : testpfp
            }
            id="profilePicture"
            className={styles.pfp__img}
          />
        </div>
        <div className={styles.upload}>
          <div className={styles.upload__box}>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={(event) => setAvatar(event.target.files[0])}
              className={styles.upload__file_select}
            />
          </div>
          <div>
            {/* this div is only ensuring that the styles for button are correct, because for example bgcolor causes the whole flex cell to be colored */}
            <button
              className={styles.upload__btn}
              onClick={() => handleUploadAvatar()}
              disabled={!avatar}
            >
              Upload Image
            </button>
          </div>
        </div>

        <ChangePass />
      </div>
    </div>
  );
}

export default User;
