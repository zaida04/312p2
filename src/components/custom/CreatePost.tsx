import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { TRPCClientErr, trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";

interface PostFormData {
    content: string;
    title: string;
}
export default function CreatePost() {
    const { register, handleSubmit, reset } = useForm<PostFormData>();
    const createPost = trpc.post.createPost.useMutation();
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    return (
        <>
            {error && <Alert variant="destructive">
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}

            <form className="p-4 rounded-lg w-[45rem] border-2" onSubmit={handleSubmit(async (data) => {
                try {
                    await createPost.mutateAsync(data);
                    setError(null);
                    reset();
                    toast({
                        title: "Post Created",
                        description: "Your post has been created successfully!",
                    })
                } catch (error) {
                    setError((error as TRPCClientErr).message);
                }
            })}>
                <div className="flex items-center mb-4">
                    <Input
                        className="input text-2xl border w-full"
                        placeholder="Your Post Title"
                        {...register("title", {
                            required: "Title is required"
                        })}
                    />
                </div>

                <div className="flex items-start space-x-4">
                    <div className="avatar">
                        <div className="rounded-full w-10 h-10">
                            <img src="/pfp.png" alt="User Avatar" />
                        </div>
                    </div>

                    <Textarea
                        placeholder="Say something!"
                        rows={3}
                        className="textarea textarea-sm flex-1 border"
                        {...register("content", {
                            required: "Content is required"
                        })}
                    />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button className="btn btn-square btn-sm btn-ghost">
                        <UploadIcon />
                    </button>

                    <Button variant="default" type="submit" className="btn btn-sm btn-primary">Post</Button>
                </div>
            </form>
        </>
    );
};
