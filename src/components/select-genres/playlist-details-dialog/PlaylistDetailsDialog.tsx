import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PlaylistDetailsDialogProps {
  namePlaylistDialogOpen: boolean;
  setNamePlaylistDialogOpen: (open: boolean) => void;
  atLeastOneGenreSelected: boolean;
  onSubmit: (values: z.infer<typeof playlistDetailsFormSchema>) => void;
}
export const playlistDetailsFormSchema = z.object({
  newPlaylistName: z.string().max(100).optional(),
  newPlaylistDescription: z.string().max(300).optional(),
});

export default function PlaylistDetailsDialog({
  namePlaylistDialogOpen,
  setNamePlaylistDialogOpen,
  atLeastOneGenreSelected,
  onSubmit,
}: PlaylistDetailsDialogProps) {
  const playlistDetailsForm = useForm<
    z.infer<typeof playlistDetailsFormSchema>
  >({
    resolver: zodResolver(playlistDetailsFormSchema),
    defaultValues: {
      newPlaylistName: "",
      newPlaylistDescription: "",
    },
  });
  return (
    <Dialog
      open={namePlaylistDialogOpen}
      onOpenChange={setNamePlaylistDialogOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={!atLeastOneGenreSelected}>Create Playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...playlistDetailsForm}>
          <form
            onSubmit={playlistDetailsForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader className="font-semibold">Add Details</DialogHeader>
            <DialogDescription>
              {`Optionally name your playlist. If you don't name it, it will be
              called "GenreSplit Playlist".`}
            </DialogDescription>
            <FormField
              control={playlistDetailsForm.control}
              name="newPlaylistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="GenreSplit Playlist" {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={playlistDetailsForm.control}
              name="newPlaylistDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This playlist was is based on..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Playlist</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
