import Link from 'next/link';
import { FOOTER_FEATURES, LANGUAGES, APP_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Features
            </h3>
            <ul className="space-y-2">
              {FOOTER_FEATURES.map((feature) => (
                <li key={feature.label}>
                  <Link
                    href={feature.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {feature.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Help
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Feedback
                </span>
              </li>
              <li>
                <span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Language
            </h3>
            <ul className="space-y-2">
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    {lang.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          2024-2026 &copy; {APP_NAME} - Official Site. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
