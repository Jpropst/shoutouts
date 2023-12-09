import Shoutout from "./Shoutout"
import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL

export const getShoutouts = async (): Promise<Shoutout[]> =>
    {
        const res = await axios.get(baseURL + "/shoutouts")
        console.log(res)
        return res.data 
    }

export const getShoutout = async (id: string): Promise<Shoutout[]> =>
    (await axios.get(baseURL + "/shoutouts/" + encodeURIComponent(id))).data

export const postShoutout = async (shoutout: Shoutout): Promise<Shoutout> =>
    (await axios.post(baseURL + "/shoutouts", shoutout)).data

export const putShoutout = async (
    id: string,
    shoutout: Shoutout
): Promise<Shoutout> =>
    (
        await axios.post(
            baseURL + "/shoutouts/" + encodeURIComponent(id),
            shoutout
            )
        ).data

export const deleteShoutout = async (id: string): Promise<void> =>
    await axios.delete(baseURL + "/shoutouts/" + encodeURIComponent(id))
