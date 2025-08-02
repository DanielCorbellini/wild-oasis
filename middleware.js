import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  // Routes where the middleware should run
  matcher: ["/account"],
};
