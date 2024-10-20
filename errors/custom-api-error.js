class CustomAPIError extends Error {
  constructor(super){
    super(message)
  }
}

module.exports = CustomAPIError