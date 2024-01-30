<template>
  <img v-if="url" :src="url" alt="bg" />
  <div class="bg-dark">
    <div class="indesicion-container">
      <input
        type="text"
        placeholder="Make a quest..."
        v-model="question"
        @keypress.enter="makeQuestion"
      />
      <p>Use question sign's</p>

      <div v-if="isValidCuestion">
        <h2>{{ oldQuest }}</h2>
        <h1>{{ answer }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indesicion",
  data() {
    return {
      question: "",
      answer: "",
      oldQuest: "",
      url: null,
      isValidCuestion: false,
    };
  },
  methods: {
    async makeQuestion() {
      try {
        this.isValidCuestion = true;
        this.url = null;
        this.answer = "Thinking...";
        this.oldQuest = this.question;
        this.question = "";
        const { image, answer } = await fetch("https://yesno.wtf/api").then(
          (res) => res.json()
        );
        this.url = image;
        this.answer = answer;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    question(value, oldValue) {
      this.isValidCuestion = false;
      console.log({ value, oldValue });
      if (!value.includes("?")) return;

      this.makeQuestion();
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  margin-top: 150px;
  margin-bottom: 15px;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}
h1 {
  text-transform: capitalize;
}
h2 {
  margin-top: 150px;
}
</style>
