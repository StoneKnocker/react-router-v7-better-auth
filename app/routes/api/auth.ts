import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { serverAuth as auth } from "~/lib/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
