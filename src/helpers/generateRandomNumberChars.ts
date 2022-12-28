function generateRandomNumberChars(charsQuantity: number) {
  let rng = ""

  for (let i = 0; i < charsQuantity; i++) rng += Math.floor(Math.random() * 10)

  return rng
}

export { generateRandomNumberChars }
