import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../constant";
const tokenId = Cookies.get("extensionTokenId");

export async function getProfileAPI() {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getProfile`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
    });
    return result.data;
  } catch (error) {
    console.log("getProfileError:", error);
    throw error;
  }
}

// ----------------------------------好友列表-----------------------------------
// 取得申請列表
export async function getFriendsAPI() {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getFriends`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
    });
    return result.data;
  } catch (error) {
    console.log("getApplyFriendsError:", error);
    throw error;
  }
}

export async function deleteFriendAPI(id: string) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/deleteFriend`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { id },
    });
    return result.data;
  } catch (error) {
    console.log("deleteFriendError:", error);
    throw error;
  }
}

// ----------------------------------好友申請-----------------------------------

// 取得好友申請列表
export async function getApplyFriendsAPI() {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/getApplyFriends`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
    });
    return result.data;
  } catch (error) {
    console.log("getApplyFriendsError:", error);
    throw error;
  }
}

// 接受好友
export async function acceptApplyFriendsAPI(
  id: string,
  name: string,
  photo: string
) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/acceptApplyFriends`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: {
        id,
        name,
        photo,
      },
    });
    return result.data;
  } catch (error) {
    console.log("getApplyFriendsError:", error);
    throw error;
  }
}
// 拒絕好友
export async function rejectApplyFriendAPI(id: string) {
  try {
    const result = await axios({
      method: "POST",
      url: `${API}/rejectApplyFriends`,
      headers: {
        Authorization: `Bearer ${tokenId}`, // Bearer 跟 token 中間有一個空格
      },
      data: { id },
    });
    return result.data;
  } catch (error) {
    console.log("getApplyFriendsError:", error);
    throw error;
  }
}

// 登出
export function Logout() {
  return Cookies.remove("extensionTokenId");
}
