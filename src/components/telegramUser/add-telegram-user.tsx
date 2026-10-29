"use client";

import {Button} from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useTelegramContext} from "@/hooks/use-telegram-context";
import {useAuth} from "@/hooks/use-auth";
import {User} from "@/entities/user/model/types";

export function AddTelegramUser() {
    const {sendCode, confirmCode} = useTelegramContext();
    const {user} = useAuth();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [codeIsSended, setCodeIsSended] = useState(false);

    async function handleSubmitPhoneNumber(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            if (user !== null) {
                await sendCode(user.id, phoneNumber);
                setCodeIsSended(true);
                console.log(codeIsSended);
            }
        } catch (err) {
            setCodeIsSended(false);
            console.error("sendCode failed:", err);
        }
    }

    async function handleSubmitCode(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            if (user !== null) {
                await confirmCode(user.id, code);
                setCodeIsSended(true);
            }
        } catch {
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <form
                onSubmit={handleSubmitPhoneNumber}
                className="w-full max-w-sm"
            >
                <FieldGroup className="gap-2">
                    <Field>
                        <FieldLabel htmlFor="form-phone">
                            Phone number
                        </FieldLabel>

                        <Input
                            id="form-phone"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Your phone number"
                            disabled={codeIsSended}
                        />
                    </Field>

                    <Field orientation="horizontal">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={codeIsSended}
                        >
                            {codeIsSended
                                ? "Waiting code.."
                                : "Send code"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

            <FieldSeparator/>

            <form
                onSubmit={handleSubmitCode}
                className="w-full max-w-sm"
            >
                <FieldGroup className="gap-2">
                    <Field>
                        <Input
                            id="form-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Code"
                            disabled={!codeIsSended}
                        />
                    </Field>

                    <Field orientation="horizontal">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={!codeIsSended}
                        >
                            Submit code
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}