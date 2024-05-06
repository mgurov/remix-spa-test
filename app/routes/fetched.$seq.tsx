import { useParams, useSearchParams } from "@remix-run/react";
import useAxios from "~/etc/axios";

export default function NumberFetcher() {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const seq = params['seq'];
    
    const url = `/api/data/${seq}?delay=2&fail=${searchParams.get('fail') ?? 'false'}`

    const { data, error, loading } = useAxios({
        url: url,
        method: 'get'
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Data Fetched</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}