<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }}</p>
  <button @click="decrement">- 1</button>
  <button @click="increment">+ 1</button>

  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
</template>
<script>
export default {
  name: "CounterVue",
  props: {
    header: String,
    start: {
      type: Number,
      default: 100,
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
  },
  data() {
    return {
      counter: this.start || 0,
    };
  },
  methods: {
    increment() {
      this.counter = this.counter + 1;
    },
    decrement() {
      if (!this.counter) return;
      this.counter = this.counter - 1;
    },
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.header || "Counter";
    },
  },
};
</script>

<style scoped>
button {
  background-color: #64b687;
  border-radius: 5px;
  border: 1px solid #fff;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.5s ease-in-out;
}
</style>
