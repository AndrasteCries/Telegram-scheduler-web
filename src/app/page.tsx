import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GuestGuard } from "@/components/user/guest-guard";
import { UserLogin } from "@/components/user/user-login";

export default async function Workspace() {
  return (
    <div className="flex justify-center m-10">
      <GuestGuard>
        <Card className="w-1/4 flex justify-center">
          <CardTitle className=" w-max-full flex justify-center">
            Login dear User
          </CardTitle>
          <CardContent className="flex justify-center w-full">
            <UserLogin />
          </CardContent>
        </Card>
      </GuestGuard>
    </div>
  );
}
