<template>
  <div class="px-5">
    <div class="mb-5 flex items-center justify-between">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold">A'zolar</h3>
      <div>
        <div class="relative mr-3 inline-block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="focus:shadow-outline p-4 focus:outline-none">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="h-5 w-5 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="search" class="w-96 rounded-lg border border-slate-300 bg-white py-1.5 pl-16 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none" placeholder="Izlash..." autocomplete="off" />
        </div>
        <button class="bordeer-slare-300 mr-3 w-full rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"><FunnelIcon class="mr-1 inline-block text-lg" /> Saralash</button>
        <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openAddMemberModal()" class="mx-1 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">A'zo qo'shish</button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div class="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
        <img src="../../assets/images/bg-login.jpg" alt="#" class="h-auto w-full" />
        <div class="flex flex-col justify-center p-5 text-center" x-data="{open: false}">
          <h3 class="text-md mb-2 font-extrabold">Jumaniyozov Surojiddin</h3>
          <p class="text-medium mb-3 text-gray-600">+998 (93) 747-59-95</p>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openModal()" class="mx-14 flex items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-5 text-gray-500 transition-all duration-200 ease-in hover:bg-slate-100">Batafsil <ArrowRightIcon x-show="open" class="ml-3 animate-pulse text-xl transition-all duration-500 ease-in" /></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Info Modal -->
  <div v-show="isModalOpen" class="fixed top-0 right-0 left-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 md:inset-0 md:h-full">
    <div class="relative top-1/2 left-1/2 h-full w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
      <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-700">
        <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
          <div class="text-xl font-semibold text-gray-900 dark:text-white">
            <div class="flex items-center">
              <img src="../../assets/images/bg-login.jpg" alt="Avatar" class="ml-2 h-20 w-20 rounded-full" />
              <div class="ml-4 pr-2">
                <h3>Admin Adminjonov</h3>
                <h5 class="text-sm">+998(99) 123-45-67</h5>
                <h6 class="text-sm text-gray-500">12.02.2022</h6>
              </div>
            </div>
          </div>
          <button type="button" @click="closeModal()" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="grid grid-cols-3 gap-4 p-6">
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
          <div>
            <h2 class="mb-3 text-xl font-bold">Kelib-ketishlar</h2>
            <div class="mb-8 w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg">
              <div class="w-full overflow-x-auto">
                <table class="w-full divide-y divide-gray-300">
                  <thead class="bg-slate-50">
                    <tr class="text-md text-left font-semibold tracking-wide text-gray-900">
                      <th scope="col" class="px-4 py-3">Kelishlar vaqti</th>
                    </tr>
                  </thead>
                  <tbody class="custom-height divide-y divide-gray-200 bg-white">
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="mr-1 inline-block text-lg" /> 17.06.2022 12:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
          <button type="button" @click="closeModal()" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yopish</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Info Modal -->
  <div v-show="isAddMemberModalOpen" class="fixed top-0 right-0 left-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 md:inset-0 md:h-full">
    <div class="relative top-1/2 left-1/2 h-full w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
      <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-700">
        <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Yangi a'zo qo'shish</h3>
          <button type="button" @click="closeAddMemberModal()" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="p-5">
          <div class="mb-3 grid grid-cols-3 rounded-lg border border-gray-300 p-3">
            <div class="flex items-center justify-between">
              <!-- in pgrogress -->
              <div v-show="registerStatus.inProgress" class="flex items-center justify-between">
                <div class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500">01</div>
                <div class="text-md ml-3 font-semibold text-blue-500">A'zo qo'shish</div>
              </div>
              <!-- completed -->
              <div v-show="registerStatus.done" class="flex items-center justify-between">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                  <CheckIcon />
                </div>
                <div class="text-md ml-3 font-semibold text-gray-700">A'zo qo'shish</div>
              </div>
              <div class="relative -left-8 mt-1">
                <div class="-rotate-25 absolute bottom-0 h-9 rounded-lg border-r border-gray-300"></div>
                <div class="rotate-25 absolute -top-1 h-9 rounded-lg border-r border-gray-300"></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <!-- default -->
              <div v-show="checkingStatus.default" class="flex items-center">
                <div class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white font-semibold text-gray-500">02</div>
                <div class="text-md ml-3 font-semibold text-gray-500">Tasdiqlash</div>
              </div>
              <!-- in progress -->
              <div v-show="checkingStatus.inProgress" class="flex items-center justify-between">
                <div class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500">02</div>
                <div class="text-md ml-3 font-semibold text-blue-500">Tasdiqlash</div>
              </div>
              <!-- completed -->
              <div v-show="checkingStatus.done" class="flex items-center justify-between">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                  <CheckIcon />
                </div>
                <div class="text-md ml-3 font-semibold text-gray-700">Tasdiqlash</div>
              </div>
              <div class="relative -left-8 mt-1">
                <div class="-rotate-25 absolute bottom-0 h-9 rounded-lg border-r border-gray-300"></div>
                <div class="rotate-25 absolute -top-1 h-9 rounded-lg border-r border-gray-300"></div>
              </div>
            </div>
            <!-- default -->
            <div v-show="congratStatus.default" class="flex items-center">
              <div class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white font-semibold text-gray-500">03</div>
              <div class="text-md ml-3 font-semibold text-gray-500">Yakunlash</div>
            </div>
            <!-- in progress -->
            <div v-show="congratStatus.inProgress" class="flex items-center">
              <div class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500">03</div>
              <div class="text-md ml-3 font-semibold text-blue-500">Yakunlash</div>
            </div>
            <!-- completed-->
            <div v-show="congratStatus.done" class="flex items-center">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                <CheckIcon />
              </div>
              <div class="text-md ml-3 font-semibold text-gray-700">Yakunlash</div>
            </div>
          </div>
        </div>
        <div v-show="registerMemberProccess.registerMode" class="mb-5 flex flex-col p-5">
          <label for="dropzone-file" class="relative mx-auto flex h-24 w-24 max-w-lg cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-blue-400 bg-slate-100 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph h-10 w-10 text-blue-500" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
              <path fill="currentColor" d="M236 184V56a20.1 20.1 0 0 0-20-20H40a20.1 20.1 0 0 0-20 20v144a20.1 20.1 0 0 0 20 20h176a20.1 20.1 0 0 0 20-20v-16ZM212 60v95l-21.9-21.8a19.8 19.8 0 0 0-28.2 0L144 151l-41.9-41.8a19.9 19.9 0 0 0-28.2 0L44 139V60ZM44 196v-23l44-44l41.9 41.8a19.8 19.8 0 0 0 28.2 0L176 153l36 36v7Zm100.7-84.7A15.9 15.9 0 0 1 140 100a16 16 0 0 1 32 0a16 16 0 0 1-16 16a15.9 15.9 0 0 1-11.3-4.7Z"></path>
            </svg>
            <input id="dropzone-file" type="file" class="hidden" />
            <h3 class="absolute -bottom-10 mx-auto mt-3 whitespace-nowrap text-lg font-semibold tracking-wide text-blue-500">Fotosuratni yuklash</h3>
          </label>
        </div>
        <!-- Step 1 -->
        <Form v-show="registerMemberProccess.registerMode" class="mb-6 grid gap-6 p-5 lg:grid-cols-2">
          <div class="p-3">
            <label for="first_name" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Ism</label>
            <input type="text" v-model="member.firstname" id="first_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="John" required />
          </div>
          <div class="p-3">
            <label for="last_name" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Familiya</label>
            <input type="text" v-model="member.lastname" id="last_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Doe" required />
          </div>
          <div class="p-3">
            <label for="birthday" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Tug'ilgan kun</label>
            <input type="date" v-model="member.birthday" id="birthday" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Flowbite" required />
          </div>
          <div class="p-3">
            <label for="phone" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Telefon raqami</label>
            <Field name="phone" v-model="member.phone" type="phone" v-mask="'+###(##) ###-##-##'" id="phone" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="+998(90) 123-45-67" required />
          </div>
        </Form>
        <!-- Step 2 -->
        <div class="flex justify-center" v-show="registerMemberProccess.checkingMode">
          <div class="flex flex-col">
            <ConfirmCode class="mx-auto text-9xl text-blue-500" />
            <p class="text-xl text-gray-600">
              <strong class="text-black">{{ member.phone }}</strong> telefon raqamiga tasdiqlash kodi SMS tarzida jo'natildi!
            </p>
            <div class="my-5 flex justify-center">
              <input type="text" class="code" maxlength="1" v-model="confirm.first" @input="onlyNumber('first')" required />
              <input type="text" class="code" maxlength="1" v-model="confirm.second" @input="onlyNumber('second')" required />
              <input type="text" class="code" maxlength="1" v-model="confirm.third" @input="onlyNumber('third')" required />
              <input type="text" class="code" maxlength="1" v-model="confirm.fourth" @input="onlyNumber('fourth')" required />
              <input type="text" class="code" maxlength="1" v-model="confirm.fifth" @input="onlyNumber('fifth')" required />
              <input type="text" class="code" maxlength="1" v-model="confirm.sixth" @input="onlyNumber('sixth')" required />
            </div>
            <div v-show="timer === '00:00'" class="my-3 flex justify-center text-lg text-red-600 hover:underline"><a href="#">SMS xabarnoma kelmadimi?</a></div>
            <div v-show="timer !== '00:00'" class="my-3 flex items-center justify-center text-xl text-red-600">
              <TimerIcon class="mr-2" /> <span>{{ timer }}</span>
            </div>
          </div>
        </div>
        <!-- Step 3 -->
        <div class="flex justify-center" v-show="registerMemberProccess.conratulationMode">
          <div class="flex flex-col">
            <SuccessfulIcon class="mx-auto text-9xl text-green-500" />
            <p class="my-5 text-center text-xl text-green-500">
              Tasdiqlash jarayoni muvaffaqiyatli yakunlandi. Jarayonni yakunlash uchun <br />
              "YAKUNLASH" tugmasini bosing!
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between space-x-2 rounded-b border-t border-gray-200 p-5 dark:border-gray-600">
          <button type="button" @click="closeAddMemberModal()" class="rounded border border-gray-300 bg-gray-200 px-4 py-2 font-medium text-gray-700 shadow-lg shadow-gray-200 outline-none transition-colors duration-200 hover:bg-gray-300 focus:bg-gray-300 focus:ring-gray-400 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yopish</button>
          <div>
            <button v-show="registerMemberProccess.registerMode" @click="clearFields()" class="mr-2 rounded border border-teal-500 bg-teal-500 px-4 py-2 font-medium text-white outline-none transition-colors duration-200 hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tozalash</button>
            <button v-show="registerMemberProccess.registerMode" @click="getMemberData()" class="rounded bg-indigo-500 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-200 outline-none transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Jo'natish</button>
            <button v-show="registerMemberProccess.checkingMode && !showCheckBtn" class="rounded bg-indigo-500 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-200 outline-none transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none" disabled>Tasdiqlash</button>
            <button v-show="showCheckBtn" @click="checkVerification()" class="rounded bg-indigo-500 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-200 outline-none transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tasdiqlash</button>
            <button v-show="isVeriticationSuccess && !lastProgressBtn" @click="createMember()" class="rounded bg-green-500 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-200 outline-none transition-colors duration-200 hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yakunlash</button>
            <button v-show="lastProgressBtn" class="flex items-center rounded bg-green-400 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-200 outline-none transition-colors duration-200 hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
              <svg role="status" class="mr-2 h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                /></svg
              >Yakunlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
import CalendarBlankIcon from '../../assets/icons/CalendarBlankIcon.vue'
import CalendarCheckIcon from '../../assets/icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../../assets/icons/CalendarXIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import { ref, reactive } from 'vue'
import { Field, Form } from 'vee-validate'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import ConfirmCode from '../../assets/icons/ConfirmCode.vue'
import TimerIcon from '../../assets/icons/TimerIcon.vue'
import SuccessfulIcon from '../../assets/icons/SuccessfulIcon.vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const isModalOpen = ref(false)
const isAddMemberModalOpen = ref(false)

const registerMemberProccess = reactive({
  registerMode: false,
  checkingMode: false,
  conratulationMode: false,
})

const registerStatus = reactive({
  inProgress: true,
  done: false,
})

const checkingStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const congratStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const member = reactive({
  firstname: '',
  lastname: '',
  birthday: '',
  phone: '',
})

const confirm = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
  fifth: '',
  sixth: '',
})

function clearFields() {
  member.firstname = ''
  member.lastname = ''
  member.birthday = ''
  member.phone = ''
}

const showCheckBtn = ref(false)
const lastProgressBtn = ref(false)

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
  if (confirm.first !== '' && confirm.second !== '' && confirm.third !== '' && confirm.fourth !== '' && confirm.fifth !== '' && confirm.sixth !== '') {
    let confirmCode = confirm.first + confirm.second + confirm.third + confirm.fourth + confirm.fifth + confirm.sixth
    if (confirmCode.length === 6) {
      showCheckBtn.value = true
    }
  } else {
    showCheckBtn.value = false
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const openAddMemberModal = () => {
  isAddMemberModalOpen.value = true
  registerMemberProccess.registerMode = true
}

const closeAddMemberModal = () => {
  isAddMemberModalOpen.value = false
  registerStatus.inProgress = true
  registerStatus.done = false
  checkingStatus.default = true
  checkingStatus.inProgress = false
  checkingStatus.done = false
  congratStatus.default = true
  congratStatus.inProgress = false
  registerMemberProccess.registerMode = true
  registerMemberProccess.checkingMode = false
  registerMemberProccess.conratulationMode = false
  showCheckBtn.value = false
  lastProgressBtn.value = false
  isVeriticationSuccess.value = false
  clearFields()
}

const timer = ref('02:00')

const getMemberData = () => {
  member.phone = member.phone.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
  //!TODO Remove me
  const members = ref([])
  if (members.value.filter((i) => i.phone === member.phone)[0]) {
    notify.warning({
      title: 'Diqqat!',
      message: `Bu <strong style="color: #000;">${member.phone}</strong> kontakt allaqachon bazada mavjud!`,
      position: 'bottomLeft',
    })
  } else if (member.firstname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, ismni kiriting!',
      position: 'bottomLeft',
    })
  } else if (member.lastname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, familiyani kiriting!',
      position: 'bottomLeft',
    })
  } else if (member.birthday === '') {
    notify.warning({
      title: 'Diqqat!',
      message: "Iltimos, tug'ilgan kunni kiriting!",
      position: 'bottomLeft',
    })
  } else if (member.phone === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, telefon raqamni kiriting!',
      position: 'bottomLeft',
    })
  } else {
    registerMemberProccess.registerMode = false
    registerMemberProccess.checkingMode = true
    registerStatus.inProgress = false
    registerStatus.done = true
    checkingStatus.default = false
    checkingStatus.inProgress = true

    localStorage.setItem('time', '02:00')
    function startTimer() {
      var time = Number(localStorage.getItem('time').slice(0, 2)) * 60 + Number(localStorage.getItem('time').slice(3, 5)),
        minutes,
        seconds
      setInterval(function () {
        minutes = parseInt(time / 60, 10)
        seconds = parseInt(time % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        localStorage.setItem('time', minutes + ':' + seconds)
        timer.value = minutes + ':' + seconds
        if (timer.value !== '00:00') {
          if (--time < 0) {
            time = duration
          }
        }
      }, 1000)
    }
    startTimer()
  }
}

const isVeriticationSuccess = ref(false)

const checkVerification = () => {
  // write checking request
  isVeriticationSuccess.value = true // delete me!

  registerMemberProccess.conratulationMode = true
  showCheckBtn.value = false
  registerMemberProccess.checkingMode = false
  checkingStatus.inProgress = false
  checkingStatus.done = true
  congratStatus.default = false
  congratStatus.inProgress = true
}

const createMember = () => {
  lastProgressBtn.value = true
  store.dispatch('membersModule/create', member).then(
    () => {
      notify.success({
        message: "A'zo muvaffaqiyatli yaratildi!",
        position: 'bottomLeft',
      })
      congratStatus.done = true
      closeAddMemberModal()
    },
    (error) => {
      notify.error({
        message: "A'zoni yaratishda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}
</script>

<style scoped>
.-rotate-25 {
  transform: rotate(-25deg);
}
.rotate-25 {
  transform: rotate(25deg);
}
.code {
  border-radius: 5px;
  font-size: 75px;
  height: 120px;
  width: 100px;
  border: 2px solid #eee;
  margin: 1%;
  text-align: center;
  font-weight: 300;
}
.code:valid {
  border-color: #3498db;
}
</style>
