import { useParams } from "@remix-run/react";
import useAxios from "~/etc/axios";

export default function NumberFetcher() {
    const params = useParams();
    const seq = params['seq'];
    
    const url = `http://localhost:8080/api/data/${seq}?delay=2`

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