import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import clarifai from "clarifai";
import { API_ROOT_URL} from '../settings.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cloudinaryPreset: '',
    cloudinaryBaseUrl: '',
    cloudinaryUploadUrl: '',
    clarifaiKey: '',
    isSearching: false,
    concepts: [],
    imageUrl: ''
  },

  getters: {
    cloudinaryPreset: state => {
      return state.cloudinaryPreset;
    },
    cloudinaryBaseUrl: state => {
      return state.cloudinaryBaseUrl;
    },
    cloudinaryUploadUrl: state => {
      return state.cloudinaryUploadUrl;
    },
    clarifaiKey: state => {
      return state.clarifaiKey;
    },
    isSearching: state => {
      return state.isSearching;
    },
    concepts: state => {
      return state.concepts;
    },
    imageUrl: state => {
      return state.imageUrl;
    }
  },

  mutations: {
    cloudinaryPreset: (state, payload) => {
      state.cloudinaryPreset = payload;
    },
    cloudinaryBaseUrl: (state, payload) => {
      state.cloudinaryBaseUrl = payload;
    },
    cloudinaryUploadUrl: (state, payload) => {
      state.cloudinaryUploadUrl = payload;
    },
    clarifaiKey: (state, payload) => {
      state.clarifaiKey = payload;
    },
    isSearching: (state, payload) => {
      state.isSearching = payload;
    },
    concepts: (state, payload) => {
      state.concepts = payload.concepts;
    },
    imageUrl: (state, payload) => {
      state.imageUrl = payload;
    }
  },

  actions: {
    analyzeImage: ({commit, state}, image )=> {
      const ident = new Clarifai.App({ apiKey: state.clarifaiKey });
      const url = `${state.cloudinaryBaseUrl}/${image}`;
      commit("imageUrl", url);

      ident.models.predict(Clarifai.GENERAL_MODEL, url).then(
        function(response) {
          const data = response.outputs[0].data;
          commit("concepts", data);
        },
        function(err) {
          console.error("Clarifai error", err);
        }
      );
    },

    getAppSettings: ({commit}) => {
      axios.get(`${API_ROOT_URL}/appsettings`)
           .then((res) => {
              console.log(res.data);
              commit("cloudinaryPreset", res.data.settings.cloudinaryPreset);
              commit("cloudinaryBaseUrl", res.data.settings.cloudinaryBaseUrl);
              commit("cloudinaryUploadUrl", res.data.settings.cloudinaryUploadUrl);
              commit("clarifaiKey", res.data.settings.clarifaiKey);
           })
           .catch((err) => {
             console.log(err);
           });
    }
  }

})