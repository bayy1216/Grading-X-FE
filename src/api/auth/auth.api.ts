import {axiosClient} from "../AxiosClient.ts";
import {LoginEmailRequest, SignUpEmailRequest} from "./auth.request.ts";
import {JwtToken} from "./auth.response.ts";

export async function login(request: LoginEmailRequest) : Promise<JwtToken>{
  const resp = await axiosClient.post("/api/v1/auth/login", {
    ...request
  });
  return resp.data;
}



export async function signup(request: SignUpEmailRequest) : Promise<JwtToken>{
  const resp = await axiosClient.post("/api/v1/auth/signup", {
    ...request
  });
  return resp.data;
}