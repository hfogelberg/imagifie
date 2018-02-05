<template>
  <div class="result">
    <h2 class="secondary-header">Result</h2>


    <div class="searching" v-show="isSearching">
      <div class="spinner"></div>
    </div>

    <div class="result-props" v-show="!isSearching">
      <div class="row">
        <div class="col">
          <ul class="list">
            <li class="list-item" v-for="concept in concepts">
            {{concept.name}}
            </li>
          </ul>
  
        </div>
        <div class="col">
          <img :src="imageUrl" class="image"/>
          <form enctype="multipart/form-data" class="form">
            <input type="file" name="image" id="file" class="inputfile" @change="uploadImage" />
            <label for="file">Choose a file</label>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      file: {}
    }
  },

  computed: {
    ...mapGetters(["concepts", "imageUrl", "cloudinaryBaseUrl", "isSearching"])
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

.result { 
  height: 200vh; 
  @media only screen and (max-width: 320px)  {
    margin-top: 7rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    margin-top: 2rem;
    padding: 2rem;
  }
  
  @media only screen and (min-width: 600px) {
    margin-top: 10rem;
  }
}

.result-props {
  @media only screen and (min-width: 600px) {
    margin-top: 8rem;
  }
}

.row {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
}

[class*='col-'] {
  width: 100%;
}

@media all and (min-width: 500px) {
  .col {
    height: auto;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.list {
  background-color: $background-color-dark;
  list-style: square;
  text-transform: capitalize;
  border-radius: 8px;
  box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);
  margin-bottom: 3rem;

  @media only screen and (max-width: 320px) {
    width: 70vw;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 2rem 2rem 2rem 4rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    width: 70vw;
    font-size: 2.5rem;
    font-weight: 400;
    padding: 3rem;
  }

  @media only screen and (min-width: 600px) {
    font-size: 2rem;
    padding: 2rem 15rem 2rem 4rem;
    font-weight: 400;
  }
}

.image {
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 .7rem .7rem rgba($color-black, .4);

  @media only screen and (max-width: 599px) {
    display: none;
  }

  @media only screen and (min-width: 600px) {
    max-width: 70%;
    margin-bottom: 4rem;
  }
}

.form {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>