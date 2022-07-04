<template>
  <div class="col-span-2">
    <h2 class="mb-3 text-xl font-bold">To'lovlar hisoboti</h2>
    <div class="mb-8 w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg">
      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-300">
          <thead class="bg-slate-50">
            <tr class="text-md text-left font-semibold tracking-wide text-gray-900">
              <th scope="col" class="px-4 py-3">To'lov vaqti</th>
              <th scope="col" class="px-4 py-3">To'lov turi</th>
              <th scope="col" class="px-4 py-3">Qiymati</th>
            </tr>
          </thead>
          <tbody class="custom-height divide-y divide-gray-200 bg-white">
            <tr class="text-md text-gray-700">
              <td class="whitespace-nowrap px-4 py-3">
                <p><CalendarCheckIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
                <p><CalendarXIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
              </td>
              <td class="whitespace-nowrap px-4 py-3">Oylik</td>
              <td class="whitespace-nowrap px-4 py-3">
                85 000.00
                <span class="text-xs">UZS</span>
              </td>
            </tr>
            <tr class="text-md text-gray-700">
              <td class="whitespace-nowrap px-4 py-3">
                <p><CalendarCheckIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
                <p><CalendarXIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
              </td>
              <td class="whitespace-nowrap px-4 py-3">Oylik</td>
              <td class="whitespace-nowrap px-4 py-3">
                85 000.00
                <span class="text-xs">UZS</span>
              </td>
            </tr>
            <tr class="text-md text-gray-700">
              <td class="whitespace-nowrap px-4 py-3">
                <p><CalendarCheckIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
                <p><CalendarXIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</p>
              </td>
              <td class="whitespace-nowrap px-4 py-3">Oylik</td>
              <td class="whitespace-nowrap px-4 py-3">
                85 000.00
                <span class="text-xs">UZS</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue'
</script>
