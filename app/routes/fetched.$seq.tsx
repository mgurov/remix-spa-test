import { useParams } from "@remix-run/react";

export default function NumberFetcher() {
    const params = useParams();

    return <>Something to be here I guess, seq # {params['seq']}</>;
}