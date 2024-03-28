import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInForm = z.object({
  email: z.string().email(),
});

type TSignInForm = z.infer<typeof SignInForm>;

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInForm>();

  const onSubmit = async (data: TSignInForm) => {
    try {
      console.log(data);
      toast.success(
        "We send you an email with the link to access the partner panel. Check your inbox!"
      );
    } catch (error) {
      toast.error("Check your credentials and try again.");
    }
  };

  return (
    <>
      <Helmet title="Sign In" />
      <div className="p-8">
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
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
