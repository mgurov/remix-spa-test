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
          Array.from({ length: 3 }, (_, i) => i + 5).map(i =>
            <li key={i}><Link to={`/fetched/${i}`}>{i}</Link></li>
          )
        }
        <li><Link to={`/fetched/15?fail=true`}>15 w. err</Link></li>
      </ul>
    </div>
  );
}
