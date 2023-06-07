<script >
import TheWelcome from "@/components/TheWelcome.vue";
import authApi from "@/providers/apis/auth";

export default {
  components: {
    TheWelcome,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  async mounted() {
    const res = await authApi.getMe();
    const user = res.data;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
  },
  methods: {
    async logout() {
      const res = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Origin: "http://localhost:3000",
        },
      });

      const result = await res.json();
      if (!result.success) {
        alert(result.error);
        return;
      }

      // Route to login
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<template>
  <main>
    <h1>You're in Home Page</h1>
    <span>Well done 🥰</span>
    <div>
      <div :class="[activeClass, true ? errorClass : errorClass]">FName: {{ firstName }}</div>
      <div>LName: {{ lastName }}</div>
      <div>Email: {{ email }}</div>
    </div>
    <div>
      <button v-on:click="logout()">Logout</button>
    </div>
  </main>
</template>

<style></style>