import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";

import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";

import StoreProfileDialog from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

function AccountMenu() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: managedRestaurantLoading } =
    useQuery({
      queryFn: getManagedRestaurant,
      queryKey: ["managedRestaurant"],
      staleTime: Infinity,
    });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            {managedRestaurantLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}

            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{profileLoading ? <Skeleton /> : profile?.name}</span>
            <span className="text-muted-foreground text-xs font-normal">
              {profileLoading ? <Skeleton /> : profile?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Store Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4 text-rose-500 dark:text-rose-400" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}

export default AccountMenu;
