import { Collapse, CollapseProps } from "antd";
import * as _ from 'lodash';

export default function Json({value}: {value: any}) {

    const item: CollapseProps['items'] = [{
        key : "json",
        label : _.truncate(JSON.stringify(value, null, 0), {length: 20}),
        children : <pre>{JSON.stringify(value, null, 2)}</pre>,
    }];

    return (
        <Collapse items={item} />
    )
}