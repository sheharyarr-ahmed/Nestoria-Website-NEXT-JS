import CabinCard from "@/app/_Components/CabinCard";
import { getCabins } from "../_lib/data-service";
import CabinList from "../_Components/CabinList";
import { Suspense } from "react";
import Spinner from "../_Components/Spinner";

export const revalidate = 0; //the concept of isr cacheing
export const metadata = {
  title: "Cabins",
};

export default async function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<Spinner />}>
        <CabinList />
        {/* the concept of partial rendering is implemented in the cabin list
        cacheing. */}
      </Suspense>
    </div>
  );
}
