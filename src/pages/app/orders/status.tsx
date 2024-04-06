import { TStatus } from "@/types/status";

function Status({ status }: { status: TStatus }) {
  switch (status) {
    case "pending":
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-slate-400" />
          <span>Pending</span>
        </>
      );
    case "canceled":
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-rose-500" />
          <span>Canceled</span>
        </>
      );
    case "processing":
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <span>Processing</span>
        </>
      );
    case "delivering":
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Delivering</span>
        </>
      );
    case "delivered":
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Delivered</span>
        </>
      );
  }
}

export default Status;
