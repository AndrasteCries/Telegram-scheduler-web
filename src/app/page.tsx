import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {GuestGuard} from "@/components/user/guest-guard";
import {UserLogin} from "@/components/user/user-login";
import {UserRegister} from "@/components/user/user-register";

export default async function Workspace() {
    return (
        <div className="flex justify-center m-10">
            <GuestGuard>
                <Card className="w-1/4 flex justify-center">
                    <CardTitle className=" w-max-full flex justify-center">
                        Login or register User
                    </CardTitle>
                    <Tabs
                        className="w-[24rem] min-w-[24rem] max-w-[24rem]"
                        defaultValue="overview"
                    >
                        <TabsList variant="line">
                            <TabsTrigger value="channel">Login</TabsTrigger>
                            <TabsTrigger value="post">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="channel" className="p-2">
                            <CardContent className="flex justify-center w-full">
                                <UserLogin/>
                            </CardContent>
                        </TabsContent>
                        <TabsContent value="post" className="p-2">
                            <UserRegister/>
                        </TabsContent>
                    </Tabs>
                </Card>
            </GuestGuard>
        </div>
    );
}
