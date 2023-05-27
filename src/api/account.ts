import axios from "axios";
import Cookies from "js-cookie";
const url = "http://127.0.0.1:8000";

export function SignInAPI(account: string, password: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/signIn`, {
        account,
        password,
      })
      .then((response) => {
        const { tokenId, accountId } = response.data as {
          tokenId: string;
          accountId: string;
        };
        Cookies.set("extensionTokenId", tokenId, { expires: 1 });
        resolve(accountId);
      })
      .catch((error) => {
        console.log("發生錯誤");
        console.log("錯誤信息：" + error);
        reject(error);
      });
  });
}

export async function SignUpAPI(
  name: string,
  account: string,
  password: string
) {
  try {
    await axios
      .post(`${url}/signUp`, {
        name,
        account,
        password,
      })
      .then((result) => {
        console.log("註冊成功");
        console.log(result);
      })
      .catch((err) => console.log("err" + err));
  } catch (error) {
    console.log("Error!!!");
    console.log("error is :" + error);
  }
}
