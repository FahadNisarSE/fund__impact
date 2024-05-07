import Image from "next/image";
import { MdPayment } from "react-icons/md";
import { Button } from "../ui/button";

export default function TopCampaignBadge() {
  return (
    <div className="h-screen max-w-sm">
      <div className="m-auto">
        <Image
          width={400}
          height={300}
          src="https://img.freepik.com/free-photo/blue-credit-card-front-back-isolated_125540-651.jpg?t=st=1715046293~exp=1715049893~hmac=88984dd561dc0d035038510da19cc4b62a768dfc2b893d5c93af33278618369b&w=1380"
          alt="Credit Card"
          className="rounded-t-2xl shadow-2xl lg:w-full 2xl:w-full 2xl:h-56 object-cover"
        />
        <div className="bg-white shadow-2xl rounded-b-3xl flex flex-col">
          <h2 className="text-center text-gray-800 text-2xl font-bold pt-6">
            Payment Protected
          </h2>
          <div className="w-5/6 m-auto">
            <p className="text-center text-gray-500 pt-5">
              Your payment are protected by stripe api.
            </p>
          </div>
          <div className="grid grid-cols-3 items-center w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1">
              <MdPayment className="w-8 h-8 text-primary" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-primary font-bold lg:text-sm">Anual Plan</p>
              <p className="text-muted-foreground text-sm">$59.99/year</p>
            </div>
          </div>
          <Button className="lg:text-sm text-lg font-bold mt-6 mx-auto">
            Proceed to Payment
          </Button>
          <div className="text-center m-auto mt-6 w-full h-16">
            <button className="text-gray-500 font-bold lg:text-sm hover:text-gray-900">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
