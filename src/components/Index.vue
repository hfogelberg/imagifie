<template>
  <div class="create">
    <header>
      <h2 class="secondary-header">Upload Image</h2>

      <p class="paragraph">
        This application is an example of using <a href="https://clarifai.com">Clarifai</a>'s
        image recognition API.<br>
        The file must be less than 195 Kb in size. Otherwise analyzes will fail!
      </p>
    </header>
    
    <form enctype="multipart/form-data" class="form">

      <input type="file" name="image" id="file" class="inputfile" @change="uploadImage" />
      <label for="file">Choose a file</label>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import clarifai from "clarifai";
import {mapGetters} from "vuex"

export default {
  data() {
    return {
      file: {}
    }
  },

  computed: {
    ...mapGetters(["cloudinaryPreset", "cloudinaryUploadUrl", "clarifaiKey"])
  },

  methods: {
    uploadImage(e) {
      console.log("Upload");
      const fd = new FormData();
      fd.append("upload_preset", this.cloudinaryPreset);
      fd.append("file", e.target.files[0]);

      const url = this.cloudinaryUploadUrl;
      console.log("Upload URL", url);
      const config = {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
         }
      };
      axios
        .post(url, fd, config)
        .then(res => {
          let image = `${res.data.public_id}.${res.data.format}`;
          this.$store.dispatch("analyzeImage", image);
          this.$router.push("/results");
        })
        .catch(err => {
          console.log("Error uploading image to Cloudianry", err);
          return false;
        });
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.create {
  margin-top: 8rem;
  position: relative;
}

header {
  width: 60vw;
  margin-left: 20vw;
  margin-bottom: 5rem;
}

.primary-header {
  margin-bottom: 5rem;
}
.paragraph {
  background-color: $background-color-dark;
  max-width: 60ch;
  display: block;
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: $gutter-small;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);
}

.form {
  position: absolute;
  margin: 0 auto;
  margin-top: 2rem;
  width: 10%;
  margin-left: 40%;
}
</style>