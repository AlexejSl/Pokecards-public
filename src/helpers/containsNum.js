function containsNumber(search) {
  // true or false depending if search contains a number
  const containsNum = /\d/.test(search);

  //if the search results contains a number we need to remove it from the end of search result and return as a "number" for search query
  //rest of the string without number is the name of the card that is returned as cardName and will be used as a parameter in a search
  if (containsNum) {
    const stringArr = search.split(" ");
    const num = stringArr.splice(-1, 1);
    return { cardName: stringArr.join(" "), cardNumber: `number:${num}` };
  } else {
    //if it doesnt contain a number it only returnes the cardname which is whole search string because its without number
    return { cardName: search, cardNumber: "" };
  }
}

export { containsNumber };
