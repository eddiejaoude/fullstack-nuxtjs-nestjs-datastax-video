<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="location"
              :counter="15"
              label="Location"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="github"
              label="GitHub"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-btn color="success" class="mr-4" @click="save">
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-card class="mx-auto" max-width="400" tile>
      <v-list-item two-line v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.location"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      location: "",
      github: "",
      items: []
    };
  },
  async fetch() {
    this.items = await fetch("http://localhost:3001/members").then(res =>
      res.json()
    );
  },
  methods: {
    async save(e) {
      e.preventDefault();
      console.log(this.name, this.location, this.github);
      await fetch("http://localhost:3001/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.name,
          location: this.location,
          github: this.github
        })
      })
        .then(res => res.json())
        .then(res => this.items.push(res));
    }
  }
};
</script>
