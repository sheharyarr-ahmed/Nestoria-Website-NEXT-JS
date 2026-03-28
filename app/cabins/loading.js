import Spinner from "@/app/_Components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center gap-4">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data</p>
    </div>
  );
}
