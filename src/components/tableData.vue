<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-0"
  ></v-data-table>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'tableData',

    data () {
      return {
        headers: [
          {
            text: 'Gen order',
            align: 'start',
            sortable: false,
            value: 'gen_order',
          },
          { text: 'Pannel id', value: 'pannel_id' },
          { text: 'Solution id', value: 'solution_id' },
          { text: 'Status', value: 'status' },
          { text: 'Start date', value: 'start_date' },
          { text: 'End date', value: 'end_date' },
          { text: 'Text to print', value: 'text_to_print' },
          { text: 'Pannel name', value: 'pannel_name' },
          { text: 'Solution name', value: 'solution_name' },
        ],
        data:[]
      }
    },
    created(){
      this.$axios.get('/solutions')
      .then((response) => {
            response.data = this.data
        })
  .catch((error) => {
    console.log(error);
  })
    }
  }
</script>
