"use client";

import {Button} from "@/components/ui/button";
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import {Field, FieldSeparator} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {DataTable} from "./templatesTable/templates-table";
import {useState} from "react";
import {SlotTemplate} from "@/entities/slot-template";
import {createColumns} from "./templatesTable/columns";
import {useDashboardContext} from "@/hooks/use-dashboard-context";

export function ChannelSettings() {
    const {templates, updateTemplates} = useDashboardContext();

    const [newTemplateTime, setNewTemplateTime] = useState("10:30:00");

    async function handleNewTemplate() {
        const newTemplate: SlotTemplate = {
            id: Date.now(),
            timeOfDay: newTemplateTime,
            label: "",
            sortOrder: templates.length,
        };

        await updateTemplates([...templates, newTemplate]);
    }

    const columns = createColumns((id: number) => {
        const updatedTemplates = templates.filter(
            template => template.id !== id
        );

        updateTemplates(updatedTemplates);
    });

    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="channel name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea value="qwe" onChange={() => {
                                }}/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Save
                    </Button>
                </CardFooter>
            </Card>

            <FieldSeparator/>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Post settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Standard text description</Label>
                                <Textarea
                                    value="standard text description"
                                    onChange={() => {
                                    }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Templates</Label>
                                <DataTable columns={columns} data={templates}/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Save
                    </Button>
                </CardFooter>
            </Card>

            <FieldSeparator/>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Add template settings</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row gap-6">
                    <Field className="w-full">
                        <Input
                            type="time"
                            id="time-picker-optional"
                            step="1"
                            value={newTemplateTime}
                            onChange={(e) => setNewTemplateTime(e.target.value)}
                            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </Field>
                    <Button type="button" onClick={handleNewTemplate}>
                        Add
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
