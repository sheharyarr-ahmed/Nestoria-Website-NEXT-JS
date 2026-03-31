"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div className="border border-primary-800 flex">
        <Button
          filter="all"
          activeFilter={activeFilter}
          onFilter={handleFilter}
        >
          All cabins
        </Button>
        <Button
          filter="small"
          activeFilter={activeFilter}
          onFilter={handleFilter}
        >
          1&mdash;3 guests
        </Button>
        <Button
          filter="medium"
          activeFilter={activeFilter}
          onFilter={handleFilter}
        >
          4&mdash;7 guests
        </Button>
        <Button
          filter="large"
          activeFilter={activeFilter}
          onFilter={handleFilter}
        >
          8&mdash;12 guests
        </Button>
      </div>
    </div>
  );
}

function Button({ filter, activeFilter, onFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => onFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
