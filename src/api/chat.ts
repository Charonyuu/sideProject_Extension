import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../constant";
const tokenId = Cookies.get("extensionTokenId");

// ----------------------------------聊天室列表-----------------------------------
export async function getConversationsListAPI() {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getConversationsList`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
    });
    return result.data;
  } catch (error) {
    console.log("getConversationsListError:", error);
    throw error;
  }
}
export async function getConversationContentAPI(conversationId: string, userId:string) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getConversationContent`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: {
        conversationId,
        userId,
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("getConversationContentError:", error);
    throw error;
  }
}

//傳送訊息
export async function sendMessageApi(
  conversationId: string,
  from: string,
  to: string,
  messageType: string,
  message: string
) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/sendMessage`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { conversationId, from, to, messageType, message },
    });
    return result.data;
  } catch (error) {
    console.log("getUserAPIError:", error);
    throw error;
  }
}
// ----------------------------------請求申請好友-----------------------------------

export async function getUserApi(userId: string) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getUserById`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { userId },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("getUserAPIError:", error);
    throw error;
  }
}

export async function addFriendApi(_id: string) {
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
