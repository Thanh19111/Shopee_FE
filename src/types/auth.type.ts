import type {User} from "./user.type.ts";
import type {SuccessResponse} from "./util.type.ts";

export type AuthResponse = SuccessResponse<{
  access_token: string;
  expires: string;
  user: User
}>
