"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { updateUserCaseWithHash, uploadToPinata } from "@/lib/pinata"
import { Toast } from "@radix-ui/react-toast"

 
const formSchema = z.object({
  casename: z.string().min(2, {
    message: "Case Name must be at least 2 characters.",
  }),
    file: z.string().min(2, {
    message: "Case File must be at least 2 characters.",
    }),
})
 
export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          casename: "",
          file: "",
        },
      })
     
      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const hash = await uploadToPinata(values.file, values.casename)

        console.log(values)
        console.log(hash)

        await updateUserCaseWithHash(values.casename, hash)

        console.log("done")

      }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="casename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Name</FormLabel>
              <FormControl>
                <Input placeholder="new case name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Case File</FormLabel>
              <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" {...field}/>
              <FormDescription>
                This is where you can upload your case files.
              </FormDescription>
                </FormItem>
            )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}