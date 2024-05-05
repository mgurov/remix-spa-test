import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (SPA Mode)</h1>
      <ul>
        {
          Array.from({ length: 9 }, (_, i) => i + 1).map(i => 
          <li key={i}><Link to={`/fetched/${i}`}>{i}</Link></li>
        )
        }
      </ul>
    </div>
  );
}
