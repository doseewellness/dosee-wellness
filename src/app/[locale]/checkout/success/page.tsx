import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import { stripe } from "@/lib/stripe/server";
import ClearCartOnMount from "@/components/cart/ClearCartOnMount";

interface SuccessPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ params, searchParams }: SuccessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("commerce.success");
  const { session_id } = await searchParams;

  let email = "";
  let orderAmount = 0;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? "";
      orderAmount = session.amount_total ?? 0;
    } catch {
      // Stripe未設定時はスキップ
    }
  }

  return (
    <>
      <ClearCartOnMount />
      <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center max-w-lg">
        <div className="h-20 w-20 rounded-full bg-brand-soft flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-brand" />
        </div>
        <h1 className="text-3xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground mb-2">{t("body")}</p>
        {email && <p className="text-sm font-medium mb-2">{email}</p>}
        {orderAmount > 0 && (
          <p className="text-2xl font-bold text-brand mb-6">
            ¥{orderAmount.toLocaleString()}
          </p>
        )}
        <div className="w-full bg-muted/40 rounded-xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-brand mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{t("shippingTitle")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("shippingBody")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
          >
            {t("continueShopping")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
          >
            {t("toTop")}
          </Link>
        </div>
      </main>
    </>
  );
}
