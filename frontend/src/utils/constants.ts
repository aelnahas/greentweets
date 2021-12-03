
export const BASE_URL = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8000"
  }
  return "https://arcane-woodland-78008.herokuapp.com"
}