<script setup lang="ts">
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
  parseJSON,
} from 'date-fns';
import type { DateFormat, ToDateMapper } from './date-time-converter.types';
import {
  isISO8601DateTimeString,
  isISO9075DateString,
  isMongoObjectId,
  isRFC3339DateString,
  isRFC7231DateString,
  isTimestamp,
  isUTCDateString,
  isUnixTimestamp,
} from './date-time-converter.models';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composables/use-validation';
import { ref, computed, watch } from 'vue'
import { useNow } from '@vueuse/core';
import InputCopyable from '@/components/InputCopyable.vue';


const inputDate = ref('');
watch(inputDate, (newValue) => {
  onDateInputChanged(newValue)
})

const toDate: ToDateMapper = date => new Date(date);

const formats: DateFormat[] = [
  {
    name: 'JS locale date string',
    fromDate: date => date.toString(),
    toDate,
    formatMatcher: () => false,
  },
  {
    name: 'ISO 8601',
    fromDate: formatISO,
    toDate: parseISO,
    formatMatcher: date => isISO8601DateTimeString(date),
  },
  {
    name: 'ISO 9075',
    fromDate: formatISO9075,
    toDate: parseISO,
    formatMatcher: date => isISO9075DateString(date),
  },
  {
    name: 'RFC 3339',
    fromDate: formatRFC3339,
    toDate,
    formatMatcher: date => isRFC3339DateString(date),
  },
  {
    name: 'RFC 7231',
    fromDate: formatRFC7231,
    toDate,
    formatMatcher: date => isRFC7231DateString(date),
  },
  {
    name: 'Unix timestamp',
    fromDate: date => String(getUnixTime(date)),
    toDate: sec => fromUnixTime(+sec),
    formatMatcher: date => isUnixTimestamp(date),
  },
  {
    name: 'Timestamp',
    fromDate: date => String(getTime(date)),
    toDate: ms => parseJSON(ms),
    formatMatcher: date => isTimestamp(date),
  },
  {
    name: 'UTC format',
    fromDate: date => date.toUTCString(),
    toDate,
    formatMatcher: date => isUTCDateString(date),
  },
  {
    name: 'Mongo ObjectID',
    fromDate: date => `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
    toDate: objectId => new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
    formatMatcher: date => isMongoObjectId(date),
  },
];

const formatIndex = ref(6);
const now = useNow();


const normalizedDate = computed(() => {
  if (!inputDate.value) {
    return now.value;
  }
  const { toDate } = formats[formatIndex.value];
  try {
    return toDate(inputDate.value);
  }
  catch (_ignored) {
    return undefined;
  }
});

const onDateInputChanged = (value: string) => {
  const matchingIndex = formats.findIndex(({ formatMatcher }) => formatMatcher(value));
  if (matchingIndex !== -1) {
    formatIndex.value = matchingIndex;
  }
}

const validation = useValidation({
  source: inputDate,
  watch: [formatIndex],
  rules: [
    {
      message: '此日期对此格式无效',
      validator: value =>
        withDefaultOnError(() => {
          if (value === '') {
            return true;
          }
          const maybeDate = formats[formatIndex.value].toDate(value);
          return isDate(maybeDate) && isValid(maybeDate);
        }, false),
    },
  ],
});

const formatDateUsingFormatter = (formatter: (date: Date) => string, date?: Date) => {
  if (!date || !validation.isValid) {
    return '';
  }
  return withDefaultOnError(() => formatter(date), '');
}


</script>

<template>
  <el-card shadow="hover">
    <div class="flex gap-2">
      <el-input v-model="inputDate" autofocus placeholder="输入日期" clearable test-id="date-time-converter-input"
        :validation="validation" />
      <el-select v-model="formatIndex" style="flex: 0 0 170px" data-test-id="date-time-converter-format-select">
        <el-option v-for="(item, i) in formats" :key="item.name" :label="item.name" :value="i">
        </el-option>
      </el-select>
    </div>
    <el-divider />
    <div class="mt-2 flex gap-2" v-for="{ name, fromDate } in formats" :key="name">
      <label class=" text-sm text-gray-400  w-40" :for="name">{{ name }}</label>
      <InputCopyable :label="name" label-position="left" label-align="right"
        :value="formatDateUsingFormatter(fromDate, normalizedDate)" placeholder="Invalid date..." :id="name" readonly />
    </div>
  </el-card>
</template>