<template>
  <div class="px-5">
    <h3 class="mb-5 ml-2 text-2xl font-extrabold md:mb-10 dark:text-gray-300">Asosiy sahifa</h3>
    <div class="grid grid-cols-1 gap-5 card-wrapper md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 md:gap-10">
      <div class="bg-white card rounded-3xl p-7 dark:bg-gray-800 dark:text-gray-300">
        <div class="flex justify-between items-top">
          <h3 class="text-xl font-bold text-gray-600 dark:text-gray-300">Jami a'zolar</h3>
          <div class="p-3 rounded-3xl bg-violet-200">
            <MembersIcon class="text-5xl text-violet-600" />
          </div>
        </div>
        <div class="mb-10 -mt-5 text-6xl font-extrabold">1,452</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="ml-2 percent">6,5%</p>
          <p class="ml-3 text-base text-gray-400">kechagi kunga nisbatan</p>
        </div>
      </div>
      <div class="bg-white card rounded-3xl p-7 dark:bg-gray-800 dark:text-gray-300">
        <div class="flex justify-between items-top">
          <h3 class="text-xl font-bold text-gray-600 dark:text-gray-300">Bir haftalik to'lovlar</h3>
          <div class="p-3 bg-orange-200 rounded-3xl">
            <OrderIcon class="text-5xl text-orange-600" />
          </div>
        </div>
        <div class="mb-10 -mt-5 text-6xl font-extrabold">7,452</div>
        <div class="flex items-center text-xl text-red-400">
          <StatisticDown class="text-3xl" />
          <p class="ml-2 percent">6,5%</p>
          <p class="ml-3 text-base text-gray-400">o'tgan haftaga nisbatan</p>
        </div>
      </div>
      <div class="bg-white card rounded-3xl p-7 dark:bg-gray-800 dark:text-gray-300">
        <div class="flex justify-between items-top">
          <h3 class="text-xl font-bold text-gray-600 dark:text-gray-300">Bir oylik chiqim</h3>
          <div class="p-3 bg-green-200 rounded-3xl">
            <ExpenseIcon class="text-5xl text-green-600" />
          </div>
        </div>
        <div class="mb-10 -mt-5 text-6xl font-extrabold">10,452</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="ml-2 percent">6,5%</p>
          <p class="ml-3 text-base text-gray-400">kechagi nisbatan o'sish</p>
        </div>
      </div>
      <div class="bg-white card rounded-3xl p-7 dark:bg-gray-800 dark:text-gray-300">
        <div class="flex justify-between items-top">
          <h3 class="text-xl font-bold text-gray-600 dark:text-gray-300">Kutilayotgan tushum</h3>
          <div class="p-3 bg-indigo-200 rounded-3xl">
            <ExpectedIcon class="text-5xl text-indigo-600" />
          </div>
        </div>
        <div class="mb-10 -mt-5 text-6xl font-extrabold">1,400</div>
        <div class="flex items-center text-xl text-green-400">
          <StatisticUp class="text-3xl" />
          <p class="ml-2 percent">6,5%</p>
          <p class="ml-3 text-base text-gray-400">o'tgan haftaga nisbatan</p>
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
