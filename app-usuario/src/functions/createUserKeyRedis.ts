import { UserType } from "@/types/user";

export default function getUserKey(user: UserType) {
    return `${user.id ?? ''}-${user.device ?? ''}`;
}