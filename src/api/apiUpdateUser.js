import supabase, { supabaseUrl } from "./supabase";

export async function updatePassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateAvatar(avatar, userId, currentUserAvatar) {
  const fileName = `avatar-${userId}-${Math.random()}`;
  //if user already has avatar, we need to delete the old one from supabase storage so the storage is not filled by useless historic images of users
  const { error: avatarDeleteError } = await supabase.storage
    .from("avatars")
    .remove(currentUserAvatar);

  if (avatarDeleteError) throw new Error(avatarDeleteError.message);

  //upload new avatar
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //update the user
  const { data, error } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
