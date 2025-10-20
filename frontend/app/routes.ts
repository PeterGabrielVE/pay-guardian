import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("register-client", "routes/register-client.tsx"),
    route("recharge", "routes/recharge.tsx"),
    route("payment", "routes/payment.tsx"),
] satisfies RouteConfig;
