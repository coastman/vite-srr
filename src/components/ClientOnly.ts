import { ref, onMounted, defineComponent, createElementBlock } from 'vue';

export default defineComponent({
  name: 'ClientOnly',

  props: ['fallback', 'placeholder', 'placeholderTag', 'fallbackTag'],

  setup (_, { slots }) {
    const mounted = ref(false);
    onMounted(() => { mounted.value = true });
    return (props: { fallback: any; placeholder: any; fallbackTag: any; placeholderTag: any }) => {
      if (mounted.value) return slots.default?.();
      const slot = slots.fallback || slots.placeholder;
      if (slot) return slot();
      const fallbackStr = props.fallback || props.placeholder || '';
      const fallbackTag = props.fallbackTag || props.placeholderTag || 'span';
      return createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
})
