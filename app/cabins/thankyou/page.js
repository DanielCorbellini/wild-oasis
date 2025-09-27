import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Thank you for you reservation!</h1>
      <Link href="/account/reservations">Manage yout reservations &rarr;</Link>
    </div>
  );
}
