import { HouseIcon, PanelsTopLeftIcon, SettingsIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
    return (
        <div className="p-10">
            <Tabs
                className="w-full flex-row"
                defaultValue="tab-1"
                orientation="vertical"
            >
                <div className="border-s">
                    <TabsList variant="underline" className=''>
                        <TabsTab value="tab-1">
                            <HouseIcon aria-hidden="true" />
                            Overview
                        </TabsTab>
                        <TabsTab value="tab-2">
                            <PanelsTopLeftIcon aria-hidden="true" />
                            Projects
                        </TabsTab>
                        <TabsTab value="tab-3">
                            <SettingsIcon aria-hidden="true" />
                            Settings
                        </TabsTab>
                    </TabsList>
                </div>
                <TabsPanel value="tab-1" className='px-20'>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="py-6 px-8 col-span-2">
                            <div className="bg-card w-full rounded-2xl col-span-2">
                                <div className="flex justify-between items-center mb-7">
                                    <div className="flex gap-4">
                                        <div className="">
                                            <div className="bg-background aspect-square w-20 h-20 flex items-center justify-center rounded-xl px-3 overflow-hidden">
                                                <img src="/logo_icon.png" alt="Profile Picture" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h1 className="text-foreground text-4xl font-bold leading-tight">User Name</h1>
                                            <p className="text-foreground/70 text-xl">usermailaddress@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="mb-2">
                                            <b>Delivery address</b>
                                            <p className="text-foreground/70">Random St. Washington DC, USA</p>
                                        </div>
                                        <div className="">
                                            <b>Date of birth</b>
                                            <p className="text-foreground/70">19.03.2005</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="default" className="bg-foreground/10 cursor-pointer text-primary px-6">Edit Profile</Button>
                            </div>
                        </Card>
                        <Card className="row-start-2 py-6 px-8">
                            <h1 className="text-3xl font-semibold mb-5">Recent Orders</h1>
                        </Card>
                        <Card className="row-start-2">
                        </Card>
                    </div>
                </TabsPanel>
                <TabsPanel value="tab-2">
                    <p className="p-4 text-center text-muted-foreground text-xs">
                        Projects content
                    </p>
                </TabsPanel>
                <TabsPanel value="tab-3">
                    <p className="p-4 text-center text-muted-foreground text-xs">
                        Settings content
                    </p>
                </TabsPanel>
            </Tabs>
        </div>
    )
}