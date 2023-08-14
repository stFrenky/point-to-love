declare module 'vue-moment' {
  import Vue, { PluginFunction } from 'vue';

  interface VueMomentOptions {
    moment: any; // типизируйте объект Moment из moment.js соответствующим образом
  }

  const VueMoment: PluginFunction<VueMomentOptions>;

  export default VueMoment;
}
