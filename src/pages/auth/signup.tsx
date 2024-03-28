import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUpForm = z.object({
  email: z.string().email(),
  managerName: z.string().min(3),
  companyName: z.string().min(3),
  phoneNumber: z.string().min(10),
});

type TSignUpForm = z.infer<typeof SignUpForm>;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignUpForm>({ resolver: zodResolver(SignUpForm) });

  const navigate = useNavigate();

  const onSubmit = async (data: TSignUpForm) => {
    try {
      console.log(data);
      toast.success(
        "Company account created successfully. Check your email to access the partner panel.",
        {
          action: {
            label: "Sign in",
            onClick: () => navigate("/auth/signin"),
          },
        }
      );
    } catch (error) {
      toast.error("Error creating your account. Try again.");
    }
  };

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute top-8 right-4">
          <Link to={"/auth/signin"} className="text-sm text-muted-foreground">
            Already have an account? Sign in
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your account, it's free!
            </h1>
            <p className="text-sm text-muted-foreground">
              Start managing your sales today
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input
                type="text"
                id="companyName"
                {...register("companyName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Manager name</Label>
              <Input
                type="text"
                id="managerName"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input type="tel" id="phoneNumber" {...register("phoneNumber")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Sign up"}
            </Button>

            <p className="text-sm px-6 text-center leading-relaxed text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="/" className="underline underline-offset-4">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/" className="underline underline-offset-4">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
