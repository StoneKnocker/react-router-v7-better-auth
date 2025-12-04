import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { getToast } from "remix-toast";
import { toast as notify, Toaster } from "sonner";
import type { Route } from "./+types/root";
import { GeneralErrorBoundary } from "./components/error-boundary";
import { ProgressBar } from "./components/progress-bar";
import { useNonce } from "./hooks/use-nonce";
import {
  ColorSchemeScript,
  useColorScheme,
} from "./lib/color-scheme/components";
import { parseColorScheme } from "./lib/color-scheme/server";
import { getPublicEnv } from "./lib/env.server";
import { requestMiddleware } from "./lib/http.server";
import {
  getLocale,
  i18nextMiddleware,
  localeCookie,
} from "./middleware/i18next";
import stylesheet from "./styles/app.css?url";

export const middleware = [i18nextMiddleware];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap",
  },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const locale = getLocale(context);

  await requestMiddleware(request);
  const colorScheme = await parseColorScheme(request);
  const { toast, headers } = await getToast(request);

  return data({ ENV: getPublicEnv(), colorScheme, toast, locale }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useNonce();
  const colorScheme = useColorScheme();
  const { i18n } = useTranslation();

  return (
    <html
      lang={i18n.language}
      dir={i18n.dir(i18n.language)}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
        <ColorSchemeScript nonce={nonce} />
        <link rel="stylesheet" href={stylesheet} precedence="high" />
      </head>
      <body>
        <ProgressBar />
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <Toaster position="top-center" theme={colorScheme} />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { ENV, toast, locale } = loaderData;
  const nonce = useNonce();

  useEffect(() => {
    if (toast?.type === "error") {
      notify.error(toast.message);
    }
    if (toast?.type === "success") {
      notify.success(toast.message);
    }
  }, [toast]);

  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <>
      <Outlet />
      <script
        nonce={nonce}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: false positive
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />
    </>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
