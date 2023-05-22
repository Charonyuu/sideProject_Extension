import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../constant";

export async function getUserApi(userId: string) {
  const tokenId = Cookies.get("extensionTokenId");
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getUserById`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { userId },
    });
    console.log(result.data)
    return result.data;
  } catch (error) {
    console.log("getUserAPIError:", error);
    throw error;
  }
}

export async function addFriendApi(_id: string) {
  const tokenId = Cookies.get("extensionTokenId");
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/addFriend`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { _id },
    });
    return alert(result.data);
  } catch (error) {
    console.log("getUserAPIError:", error);
    throw error;
  }
}
