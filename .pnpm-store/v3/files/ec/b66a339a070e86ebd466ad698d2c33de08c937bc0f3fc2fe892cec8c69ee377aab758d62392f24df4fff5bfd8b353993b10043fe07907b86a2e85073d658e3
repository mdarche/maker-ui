import { overwriteMerge } from '../overwrite-merge';
import { combineMerge } from '../combine-merge';
const getMergeFn = (type) => {
    switch (type) {
        case 'overwrite':
            return overwriteMerge;
        case 'combine':
        default:
            return combineMerge;
    }
};
export default getMergeFn;
