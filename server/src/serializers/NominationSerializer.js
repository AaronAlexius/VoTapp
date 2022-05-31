class NominationSerializer {
  static getSummary(meme) {
    const allowedAttributes = ["id", "topicId", "userId", "memeUrl"]
    let serializedNomination = {}

    for (const attribute of allowedAttributes) {
      serializedNomination[attribute] = meme[attribute]
    }
    return serializedNomination
  }
}

export default NominationSerializer