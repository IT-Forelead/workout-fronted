<template>
  <div class="px-5">
    <h1 class="my-3 text-2xl font-extrabold">Asosiy sahifa</h1>
    <div class="card-wrapper grid grid-cols-4 gap-10">
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-2xl font-bold text-gray-600">Jami a'zolar</h3>
          <div class="rounded-3xl bg-violet-200 p-3">
            <MembersIcon class="text-5xl text-violet-600" />
          </div>
        </div>
        <div class="text-6xl font-extrabold mb-5">1,452</div>
        <div class="flex items-center text-green-400 text-xl">
          <StatisticUp class="text-3xl"/>
          <p class="percent ml-2">6,5%</p>
          <p class="text-gray-400 ml-3 text-lg">kechagi kunga nisbatan</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-2xl font-bold text-gray-600">Bir haftalik to'lovlar</h3>
          <div class="rounded-3xl bg-orange-200 p-3">
            <OrderIcon class="text-5xl text-orange-600" />
          </div>
        </div>
        <div class="text-6xl font-extrabold mb-5">7,452</div>
        <div class="flex items-center text-red-400 text-xl">
          <StatisticDown class="text-3xl"/>
          <p class="percent ml-2">6,5%</p>
          <p class="text-gray-400 ml-3 text-lg">o'tgan hafatga nisbatan</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-2xl font-bold text-gray-600">Bir oylik chiqim</h3>
          <div class="rounded-3xl bg-green-200 p-3">
            <ExpenseIcon class="text-5xl text-green-600" />
          </div>
        </div>
        <div class="text-6xl font-extrabold mb-5">10,452</div>
        <div class="flex items-center text-green-400 text-xl">
          <StatisticUp class="text-3xl"/>
          <p class="percent ml-2">6,5%</p>
          <p class="text-gray-400 ml-3 text-lg">kechagi nisbatan o'sish</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-2xl font-bold text-gray-600">Kutilayotga tushum</h3>
          <div class="rounded-3xl bg-indigo-200 p-3">
            <ExpectedIcon class="text-5xl text-indigo-600" />
          </div>
        </div>
        <div class="text-6xl font-extrabold mb-5">1,400</div>
        <div class="flex items-center text-green-400 text-xl">
          <StatisticUp class="text-3xl"/>
          <p class="percent ml-2">6,5%</p>
          <p class="text-gray-400 ml-3 text-lg">o'tgan hafatga nisbatan</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MembersIcon from '../../assets/icons/MembersIcon.vue'
import StatisticUp from '../../assets/icons/StatisticUp.vue'
import StatisticDown from '../../assets/icons/StatisticDown.vue'
import OrderIcon from '../../assets/icons/OrderIcon.vue'
import ExpenseIcon from '../../assets/icons/ExpenseIcon.vue'
import ExpectedIcon from '../../assets/icons/ExpectedIcon.vue'
</script>
