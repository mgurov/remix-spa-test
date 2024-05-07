import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Button } from "antd";
import { store } from './data/store';
import { Provider } from "react-redux";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div>
            <Link to="/"><Button type="primary">Hjem.</Button></Link>
          </div>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </Provider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
