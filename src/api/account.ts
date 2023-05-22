import axios from "axios";
import Cookies from "js-cookie";
const url = "http://127.0.0.1:8000";

export async function SignInAPI(account: string, password: string) {
  try {
    await axios
      .post(`${url}/signIn`, {
        account,
        password,
      })
      .then((result) => {
        console.log("登入成功");
        console.log(result.data);
        Cookies.set("extensionTokenId", result.data.tokenId, { expires: 1 });
      })
      .catch((err) => console.log("err" + err));
  } catch (error) {
    console.log("Error!!!");
    console.log("error is :" + error);
  }
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
