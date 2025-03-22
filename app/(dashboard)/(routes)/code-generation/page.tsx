"use client";
import * as z from "zod";

import Heading from "@/components/Heading";
import { MessageSquare, Clipboard, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ReactMarkdown from "react-markdown";

export default function CodeGenerationPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/code-generation", {
                messages: newMessages,
            });
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (err) {
            console.log(err);
        } finally {
            router.refresh();
        }
    };

    // Copy message to clipboard
    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedMessage(content);
        setTimeout(() => setCopiedMessage(null), 1500);
    };

    return (
        <div>
            <Heading
                title="Code-Generation"
                description="Most Advanced Code-Generation Model"
                icon={MessageSquare}
                color="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-1 w-full">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                type="text"
                                                placeholder="Simple generation of code using text"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="flex items-center justify-center p-8 rounded-lg w-full bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No Conversation Started" />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={String(message.content)}
                                className={cn(
                                    "relative p-8 flex items-start rounded-lg",
                                    message.role === "user"
                                        ? "bg-white border border-black/10 gap-x-4 items-center justify-end"
                                        : "bg-orange-200 text-white justify-start"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                                <div className="text-sm overflow-hidden leading-7 w-full">
                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-black/10 rounded-lg p-1" {...props} />
                                            ),
                                        }}
                                    >
                                        {String(message.content || "")}
                                    </ReactMarkdown>
                                </div>

                                {/* Copy Button (Top-right Corner) */}
                                <button
                                    className="absolute top-2 right-2 bg-black/20 text-white p-1 rounded-md hover:bg-black/30 transition"
                                    onClick={() => handleCopy(String(message.content || ""))}
                                >
                                    {copiedMessage === String(message.content) ? (
                                        <Check size={18} className="text-green-400" />
                                    ) : (
                                        <Clipboard size={18} />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
