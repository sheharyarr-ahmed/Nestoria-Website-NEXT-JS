import Link from "next/link";
import Navigation from "./Components/Navigation";
export default function Page() {
  return (
    <div>
      <h1>Nestoria. your next place to stay.</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
