import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-xs font-sans tracking-wider uppercase text-[#777777]">
        <li>
          <Link href="/" className="hover:text-[#181818] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span className="text-[#cccccc]">&bull;</span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#181818] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#181818] font-medium truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
