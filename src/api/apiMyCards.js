import supabase from "./supabase";

export async function uploadCard(
  cardName,
  cardNum,
  cardRarity,
  cardId,
  cardSet,
  cardImgLink,
  userId,
  uniqueCardId
) {
  // 1. Create card
  try {
    const { data, error } = await supabase.from("cards").insert([
      {
        cardName: cardName,
        cardNum: cardNum,
        cardRarity: cardRarity,
        cardId: cardId,
        cardSet: cardSet,
        cardImgLink: cardImgLink,
        userId: userId,
        uniqueCardId: uniqueCardId,
      },
    ]);

    if (error) {
      throw error;
    }

    console.log("Card successfully uploaded to Supabase", data);
  } catch (error) {
    console.error("Error uploading card to Supabase", error.message);
    throw error;
  }
}

// cardId
export async function getCards(userId) {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error("Cards not found");
  }

  return data;
}

export async function deleteCard(uniqueCardId) {
  const { error } = await supabase
    .from("cards")
    .delete()
    .eq("uniqueCardId", uniqueCardId);
}
