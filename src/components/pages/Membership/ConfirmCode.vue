<template>
  <div>
    <input type="text" class="code" maxlength="1" v-model="confirm.first" @input="onlyNumber('first')" required />
    <input type="text" class="code" maxlength="1" v-model="confirm.second" @input="onlyNumber('second')" required />
    <input type="text" class="code" maxlength="1" v-model="confirm.third" @input="onlyNumber('third')" required />
    <input type="text" class="code" maxlength="1" v-model="confirm.fourth" @input="onlyNumber('fourth')" required />
    <input type="text" class="code" maxlength="1" v-model="confirm.fifth" @input="onlyNumber('fifth')" required />
    <input type="text" class="code" maxlength="1" v-model="confirm.sixth" @input="onlyNumber('sixth')" required />
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const confirm = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
  fifth: '',
  sixth: '',
})

function onlyNumber(order) {
  confirm[order] = confirm[order].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  const codes = document.querySelectorAll('.code')
  codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
      if (idx >= 0 && idx < 5) {
        if (e.key >= 0 && e.key <= 9) {
          codes[idx].value = ''
          setTimeout(() => codes[idx + 1].focus(), 10)
        }
      }
      if (e.key === 'Backspace' && idx > 0 && idx <= 5) {
        setTimeout(() => codes[idx - 1].focus(), 10)
      }
    })
  })
}
</script>
<style scoped>
.code {
  border-radius: 5px;
  font-size: 75px;
  height: 120px;
  width: 100px;
  border: 1px solid #eee;
  margin: 1%;
  text-align: center;
  font-weight: 300;
  -moz-appearance: textfield;
}

.code::-webkit-outer-spin-button,
.code::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.code:valid {
  border-color: #3498db;
}
</style>
