<template>
  <div class="create">
    <p class="paragraph">
      Upload an image (or take a photo on a mobile) <br />
      and the app will till you what is in the picture.
    </p>
    
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
        })
        .catch(err => {
          console.log("Error uploading image to Cloudianry", err);
          return false;
        });
      
      this.$store.dispatch("setIsSearching", true);
      this.$router.push("/results");
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.create {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  
  @media only screen and (max-width: 320px) {
    margin-top: 7rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    margin-top: 4rem;
  }
  @media only screen and (min-width: 600px) {
    margin-top: 10rem;
  }
}

.paragraph {
  border-radius: 8px;
  background-color: $background-color-dark;
  box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);

  @media only screen and (max-width: 320px) {
    width: 70vw;
    padding: 1rem;
    margin-top: 4rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    width: 70vw;
    padding: 1rem;
    margin-top: 4rem;
  }
    @media only screen and (min-width: 600px) {
      margin-top: 8rem;
      max-width: 60ch;
      font-size: 3rem;
      font-weight: 400;
      margin-bottom: $gutter-small;
      border-radius: 8px;
      padding: 3rem;
    }
}

.form {
  margin-top: 8rem;
}
</style>