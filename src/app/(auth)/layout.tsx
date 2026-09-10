/**
 * Auth route group layout.
 * The (auth) folder name is a Next.js route group — it does NOT affect the URL
 * path. Pages render at /login and /signup directly.
 *
 * This layout strips the site's main Header/Footer and renders a minimal
 * centred shell consistent with the NISA Boutique brand.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
