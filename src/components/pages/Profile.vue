<template>
  <div class="relative px-3">
    <div
      class="absolute z-0 z-50 flex items-center justify-center w-full h-full text-white -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg top-1/2 left-1/2">
      <h1 class="text-6xl font-extrabold">Tez Kunda...</h1>
    </div>
    <h3 class="mb-1 ml-3 text-3xl font-extrabold dark:text-gray-300">Profil</h3>
    <div class="grid grid-cols-1 gap-1 mb-5 md:grid-cols-2">
      <div class="p-3">
        <div class="p-3 px-5 my-3 bg-white rounded-lg dark:bg-gray-800 dark:text-gray-300">
          <h3 class="mb-3 text-2xl font-extrabold">Profilni taxrirlash</h3>
          <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
          <form>
            <div class="mb-6">
              <label for="name-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Ismingiz</label>
              <input type="text" id="name-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ismingizni kiriting..." disabled />
            </div>
            <div class="mb-6">
              <label for="gender-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Jinsingizni</label>
              <select id="gender-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled>
                <option>Jinsingizni tanlang</option>
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
              </select>
            </div>
            <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
            <div class="flex justify-end">
              <input type="reset"
                class="mx-1 bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value="Tozalash" disabled />
              <button type="submit"
                class="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled>Jo'natish
              </button>
            </div>
          </form>
        </div>
        <div class="p-3 px-5 my-3 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-800">
          <h3 class="mb-3 text-2xl font-extrabold">Emailni taxrirlash</h3>
          <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
          <form>
            <div class="mb-6">
              <label for="email-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input type="email" id="email-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Yangi emailni kiriting..." disabled />
            </div>
            <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
            <div class="flex justify-end">
              <input type="reset"
                class="mx-1 bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value="Tozalash" disabled />
              <button type="submit"
                class="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled>Jo'natish
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="p-3">
        <div class="p-3 px-5 my-3 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-800">
          <h3 class="mb-3 text-2xl font-extrabold">Parolni taxrirlash</h3>
          <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
          <form>
            <div class="mb-6">
              <label for="password-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Hozirgi
                parol</label>
              <input type="password" id="password-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hozirgi parolni kiriting..." disabled />
            </div>
            <div class="mb-6">
              <label for="new-password-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Yangi
                parol</label>
              <input type="password" id="new-password-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Yangi parolni kiriting..." disabled />
            </div>
            <div class="mb-6">
              <label for="repeat-password-input"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Yangi parolni
                takrorlang</label>
              <input type="password" id="repeat-password-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Yangi parolni takrorlang..." disabled />
            </div>
            <hr class="mb-6 border-gray-200 dark:border-gray-600 bottom-1" />
            <div class="flex justify-end">
              <input type="reset"
                class="mx-1 bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value="Tozalash" disabled />
              <button type="submit"
                class="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled>Jo'natish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>