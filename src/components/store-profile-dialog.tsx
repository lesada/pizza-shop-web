import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";
import { queryClient } from "@/lib/react-query";

import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

type StoreProfileFormValues = z.infer<typeof storeProfileSchema>;

function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managedRestaurant"],
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileFormValues>({
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileFormValues) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managedRestaurant",
    ]);

    if (!cached) return { cached: null };

    queryClient.setQueryData<GetManagedRestaurantResponse>(
      ["managedRestaurant"],
      {
        ...cached,
        name,
        description,
      }
    );

    return { cached };
  }

  const { mutateAsync: mutateProfile } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCache({ name, description });

      return { previousValue: cached };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["managedRestaurant"], context?.previousValue);
    },
  });

  async function onSubmit(values: StoreProfileFormValues) {
    try {
      await mutateProfile(values);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Change your store's name, description, and other details.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              Save
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}

export default StoreProfileDialog;
