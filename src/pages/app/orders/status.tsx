import { TOrder } from "@/api/get-orders";

function Status({ status }: { status: TOrder["status"] }) {
  switch (status) {
    case "pending":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-slate-400" />
          <span>Pending</span>
        </>
      );
    case "completed":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-success" />
          <span>Completed</span>
        </>
      );
    case "canceled":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-error" />
          <span>Canceled</span>
        </>
      );
    case "processing":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-warning" />
          <span>Processing</span>
        </>
      );
    case "delivering":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-primary" />
          <span>Delivering</span>
        </>
      );
    case "delivered":
      return (
        <>
          <div className="h-2 w-2 bg-success rounded-full bg-success" />
          <span>Delivered</span>
        </>
      );
  }
}

export default Status;
