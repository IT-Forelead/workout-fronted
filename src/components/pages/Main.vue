<template>
  <div class="h-full px-5">
    <h3 class="ml-2 -mt-5 mb-10 text-2xl font-extrabold">Asosiy sahifa</h3>
    <div class="card-wrapper grid grid-cols-4 gap-10">
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-xl font-bold text-gray-600">Jami a'zolar</h3>
          <div class="rounded-3xl bg-violet-200 p-3">
            <MembersIcon class="text-5xl text-violet-600" />
          </div>
        </div>
        <div class="-mt-5 mb-10 text-6xl font-extrabold">1,452</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="percent ml-2">6,5%</p>
          <p class="ml-3 text-base text-gray-400">kechagi kunga nisbatan</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-xl font-bold text-gray-600">Bir haftalik to'lovlar</h3>
          <div class="rounded-3xl bg-orange-200 p-3">
            <OrderIcon class="text-5xl text-orange-600" />
          </div>
        </div>
        <div class="-mt-5 mb-10 text-6xl font-extrabold">7,452</div>
        <div class="flex items-center text-xl text-red-400">
          <StatisticDown class="text-3xl" />
          <p class="percent ml-2">6,5%</p>
          <p class="ml-3 text-base text-gray-400">o'tgan hafatga nisbatan</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-xl font-bold text-gray-600">Bir oylik chiqim</h3>
          <div class="rounded-3xl bg-green-200 p-3">
            <ExpenseIcon class="text-5xl text-green-600" />
          </div>
        </div>
        <div class="-mt-5 mb-10 text-6xl font-extrabold">10,452</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="percent ml-2">6,5%</p>
          <p class="ml-3 text-base text-gray-400">kechagi nisbatan o'sish</p>
        </div>
      </div>
      <div class="card rounded-3xl bg-white p-7">
        <div class="items-top flex justify-between">
          <h3 class="text-xl font-bold text-gray-600">Kutilayotga tushum</h3>
          <div class="rounded-3xl bg-indigo-200 p-3">
            <ExpectedIcon class="text-5xl text-indigo-600" />
          </div>
        </div>
        <div class="-mt-5 mb-10 text-6xl font-extrabold">1,400</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="percent ml-2">6,5%</p>
          <p class="ml-3 text-base text-gray-400">o'tgan hafatga nisbatan</p>
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
