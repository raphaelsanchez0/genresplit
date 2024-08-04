"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const formSchema = z.object({
    query: z.string().min(1, { message: "Please enter a search query" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/search?q=${data.query}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative min-w-96">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" {...field} />
                </div>
              </FormControl>
              <FormMessage className="text-center`" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
