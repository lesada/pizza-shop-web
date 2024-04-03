import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { signin } from "@/api/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInForm = z.object({
  email: z.string().email(),
});

type TSignInForm = z.infer<typeof SignInForm>;

function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInForm>({
    resolver: zodResolver(SignInForm),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const { mutateAsync: authenticate, error } = useMutation({
    mutationFn: signin,
  });

  const onSubmit = async (data: TSignInForm) => {
    try {
      await authenticate(data);

      if (error) return toast.error("Invalid email address");

      toast.success(
        "Successfully signed in, check your email for the magic link"
      );
    } catch (error) {
      toast.error("Invalid email address");
    }
  };

  return (
    <>
      <Helmet title="Sign In" />
      <div className="p-8 ">
        <Button asChild variant="ghost" className="absolute top-8 right-4">
          <Link to={"/auth/signup"} className="text-sm text-muted-foreground">
            New here? Sign up
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Check your partner panel and manage your sales
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
