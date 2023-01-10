import Bridge from '@module/bridge';
import Train from './src/index.vue';
import Head from './module/head.vue';
import Foot from './module/foot.vue';
import Compartment from './module/compartment.vue';

(Train as any).bridge = Bridge;
(Train as any).head = Head;
(Train as any).foot = Foot;
(Train as any).compartment = Compartment;

export default Train;
export const TrainHead = Head;
export const TrainFoot = Foot;
export const TrainCompartment = Compartment;
