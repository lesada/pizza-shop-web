import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getManagedRestaurant } from "@/api/get-managed-restaurant";

import { Button } from "./ui/button";
import {
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
  description: z.string(),
});

type StoreProfileFormValues = z.infer<typeof storeProfileSchema>;

function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managedRestaurant"],
  });

  const { register } = useForm<StoreProfileFormValues>({
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Change your store's name, description, and other details.
        </DialogDescription>
      </DialogHeader>
      <form>
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
            <Button variant="outline">Cancel</Button>
            <Button type="submit" variant="success">
              Save
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}

export default StoreProfileDialog;
