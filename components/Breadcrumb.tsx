import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1">
        <li>
          <Link href="/" className="hover:text-[#1F1A14] transition">
            Strona glowna
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center space-x-1">
            <span className="mx-1">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#1F1A14] transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
