import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("commerce.cancel");

  return (
    <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-lg">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <XCircle className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-3">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("body")}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/cart"
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          {t("toCart")}
        </Link>
        <Link
          href="/shop"
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("continueShopping")}
        </Link>
      </div>
    </main>
  );
}
