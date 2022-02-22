<template>

</template>
<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import {getAddressList, removeAddress, editAddress, addAddress, getUnInstall} from '../../api/api';

export default {
  methods: {

  },
  mounted() {
    this.$router.push({name:'new_order'})
  }
}

</script>

<style scoped>

</style>