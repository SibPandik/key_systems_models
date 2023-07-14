import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth/auth'
import post from './post/post'
import tags from './post/tags'
import authors from './post/authors'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        tags,
        authors,
        post,
    }
})