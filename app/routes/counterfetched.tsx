import type { RootState } from '~/data/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '~/data/counterSlice'
import { Button, Card, List } from 'antd';
import fetcherSlice from '~/data/fetcherSlice';
import Json from '~/etc/Json';


export default function NumberFetcher() {
    return <>Here we'll counter-fetch <div><Counter /></div>
        <div><Fetchers /></div>
    </>;
}


export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const initiateFetcher = () => {
        dispatch(fetcherSlice.actions.initiate({
            from: 1,
            to: count,
        }))
    }

    return (
        <div>
            <div>
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </Button>
                <span>{count}</span>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </Button>
                <Button
                    aria-label="Start fetching"
                    onClick={initiateFetcher}
                >
                    Fetch
                </Button>
            </div>
        </div>
    )
}

export function Fetchers() {
    const tasks = useSelector((state: RootState) => state.fetcher.tasks)

    return (
        <>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item>
                        <Card title={`${task.seqNo} ${task.state}`}>{task.current} of {task.request.from} to {task.request.to}
                            <Json value={task.results} />
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}