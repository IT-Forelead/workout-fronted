<template>
  <div class="h-full px-5">
    <div class="mb-5 flex items-center">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold">Sozlamalar</h3>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="max-content-h rounded-lg bg-white p-3 px-5">
        <h3 class="mb-3 text-2xl font-extrabold">Sozlamalarni sozlash</h3>
        <hr class="bottom-1 mb-6 border-dotted border-gray-200" />
        <form>
          <div class="mb-6">
            <label for="gym-name" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">Klub nomi</label>
            <input type="text" name="name" id="gym-name" class="block w-full rounded-lg border border-gray-300 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Klub nomini kiriting..." />
          </div>
          <div class="mb-6">
            <label for="daily-price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">Kunlik to'lov</label>
            <div class="relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-sm text-gray-500"> UZS </span>
              </div>
              <input type="text" name="daily-price" id="daily-price" class="block w-full rounded-lg border border-gray-300 pl-11 pr-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <div class="mb-6">
            <label for="monthly-price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">Oylik to'lov</label>
            <div class="relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-sm text-gray-500"> UZS </span>
              </div>
              <input type="text" name="monthly-price" id="monthly-price" class="block w-full rounded-lg border border-gray-300 pl-11 pr-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <hr class="bottom-1 mb-6 border-dotted border-gray-200" />
          <div class="flex justify-end">
            <input type="reset" class="mx-1 w-full rounded-lg bg-blue-200 px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto" value="Tozalash" />
            <button type="submit" class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>