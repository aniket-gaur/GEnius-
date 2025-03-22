"use client";
import * as z from "zod";


import Heading from "@/components/Heading";
import { MessageSquare, MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";


import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";






export default function MusicPage() {
    const router = useRouter();
    const [Music, setMusic] = useState<String>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit = (async (values: z.infer<typeof formSchema>) => {
        try {

            setMusic("undefined");

            const response = await axios.post("/api/music-generation", values
            )
            setMusic(response.data.audio);

            form.reset();
        } catch (err) {
            console.log(err);


        }
        finally {
            router.refresh();
        }


    })
    return <>
        <div>
            <Heading
                title="Music Generation"
                description="Most Advanced Music Generation Model"
                icon={MusicIcon}
                color="text-purple-700"

                bgColor="bg-purple-700/10"







            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="
                        rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({ field }) => (<FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-1 w-full">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" type="string" placeholder="calculate the radius of the circle" disabled={isLoading} {...field} />

                                </FormControl>

                            </FormItem>)} />
                            <Button className="col-span-12 lg:col-span-2 w-full " disabled={isLoading}>
                                Generate
                            </Button>

                        </form>


                    </Form>

                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && <div className="flex items-center justify-center p-8 rounded-lg w-full bg-muted">
                        <Loader />


                    </div>}
                    {!Music && !isLoading && (<div>
                        <Empty label="No Music  Generated" />
                    </div>)}
                    <div>
                        <p>Music will be Generated here</p>
                    </div>

                </div>

            </div>
        </div>

    </>


}



