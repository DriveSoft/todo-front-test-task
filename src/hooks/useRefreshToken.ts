import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/users/refreshaccesstoken", {
            withCredentials: true,
        });

        //@ts-expect-error it's ok
        setAuth?.((prev) => {
            console.log("Expired token", JSON.stringify(prev));
            console.log("New token", response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        })

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;

