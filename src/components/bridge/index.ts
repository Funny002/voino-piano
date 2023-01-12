import column from './module/column.vue';
import Bridge from './src/index.vue';

(Bridge as any).column = column;

export default Bridge;

export const BridgeColumn = column;
