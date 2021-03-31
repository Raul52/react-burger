import axios from "axios";

const firebaseInstance = axios.create({
    baseURL: "https://react-server-a2f94-default-rtdb.firebaseio.com/"
})

export default firebaseInstance;