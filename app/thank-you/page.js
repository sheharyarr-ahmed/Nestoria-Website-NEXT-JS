function formatDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatPrice(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const reservationId = params?.reservationId ?? params?.id ?? null;
  const cabinName = params?.cabin ?? params?.cabinName ?? null;
  const startDate = formatDate(params?.startDate);
  const endDate = formatDate(params?.endDate);
  const numGuests = Number(params?.numGuests);
  const totalPrice = formatPrice(params?.totalPrice);

  const details = [
    reservationId ? { label: "Reservation", value: `#${reservationId}` } : null,
    cabinName ? { label: "Cabin", value: cabinName } : null,
    startDate ? { label: "Check-in", value: startDate } : null,
    endDate ? { label: "Check-out", value: endDate } : null,
    Number.isFinite(numGuests) && numGuests > 0
      ? {
          label: "Guests",
          value: `${numGuests} ${numGuests === 1 ? "guest" : "guests"}`,
        }
      : null,
    totalPrice ? { label: "Estimated total", value: totalPrice } : null,
  ].filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8">
      <div className="bg-primary-900 border border-primary-800 px-10 py-12 text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-400">
          Reservation confirmed
        </p>
        <h1 className="text-4xl font-semibold text-accent-400">
          Thank you for your reservation!
        </h1>
        <p className="text-lg text-primary-200">
          Your cabin stay has been saved. We look forward to welcoming you to
          Nestoria.
        </p>
      </div>

      {details.length > 0 ? (
        <div className="bg-primary-900 border border-primary-800 px-8 py-8">
          <h2 className="text-2xl font-semibold text-primary-100 mb-6">
            Reservation details
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="bg-primary-950 border border-primary-800 rounded-sm px-5 py-4"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-primary-500 mb-2">
                  {detail.label}
                </p>
                <p className="text-xl text-primary-100">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-primary-900 border border-primary-800 px-8 py-6 text-center">
          <p className="text-primary-200">
            Your reservation was completed successfully. The booking details
            will appear here once this page is opened with reservation data.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/account/reservations"
          className="bg-accent-500 px-6 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all"
        >
          Manage your reservations
        </a>
        <a
          href="/cabins"
          className="border border-primary-700 px-6 py-4 text-primary-200 font-semibold hover:bg-primary-900 transition-all"
        >
          Explore more cabins
        </a>
      </div>
    </div>
  );
}
