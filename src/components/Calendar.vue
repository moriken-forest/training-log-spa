<template>
  <div @touchstart="onTouchStart" @touchend="onTouchEnd">
    <!-- ナビゲーション -->
    <div id="calendarHeader">
      <button @click="prevMonth">◀︎</button>
      <h2 id="currentMonth">{{ viewYear }}年 {{ viewMonth + 1 }}月</h2>
      <button @click="nextMonth">▶︎</button>
    </div>

    <!-- カレンダー本体 -->
    <div id="calendar">
      <!-- 曜日ヘッダー -->
      <div v-for="w in weekdays" :key="w" class="weekday">
        {{ w }}
      </div>
      <!-- 空セル -->
      <div v-for="n in firstDay" :key="'e'+n" class="day-cell disabled"></div>
      <!-- 日セル -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        :class="[
          'day-cell',
          isLog(day) ? 'has-log' : (isSchedule(day) ? 'has-schedule' : 'disabled'),
          selectedDay === day ? 'selected' : '',
          isToday(day) ? 'today' : ''
        ]"
        @click="selectDate(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    logDates: {
      type: Array,
      default: () => []
    },
    scheduleDates: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select-date'],
  data() {
    const today = new Date();
    return {
      viewYear: today.getFullYear(),
      viewMonth: today.getMonth(), // 0-based
      selectedDay: null,
      todayYear: today.getFullYear(),
      todayMonth: today.getMonth(),
      todayDate: today.getDate(),
      touchStartX: null
    };
  },
  computed: {
    weekdays() {
      // Display weekdays starting from Monday
      return ['月','火','水','木','金','土','日'];
    },
    firstDay() {
      // Adjust so that Monday is treated as the first day of the week
      const day = new Date(this.viewYear, this.viewMonth, 1).getDay();
      return (day + 6) % 7;
    },
    daysInMonth() {
      return new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    }
  },
  methods: {
    format(day) {
      return `${this.viewYear}-${String(this.viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    },
    isLog(day) {
      return this.logDates.includes(this.format(day));
    },
    isSchedule(day) {
      return this.scheduleDates.includes(this.format(day));
    },
    isToday(day) {
      return (
        this.todayYear === this.viewYear &&
        this.todayMonth === this.viewMonth &&
        this.todayDate === day
      );
    },
    isAvailable(day) {
      return this.isLog(day) || this.isSchedule(day);
    },
    prevMonth() {
      this.viewMonth--;
      if (this.viewMonth < 0) {
        this.viewMonth = 11;
        this.viewYear--;
      }
      this.selectedDay = null;
    },
    nextMonth() {
      this.viewMonth++;
      if (this.viewMonth > 11) {
        this.viewMonth = 0;
        this.viewYear++;
      }
      this.selectedDay = null;
    },
    selectDate(day) {
      if (!this.isAvailable(day)) return;
      this.selectedDay = day;
      const dateStr = `${this.viewYear}-${String(this.viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      this.$emit('select-date', dateStr);
    },
    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    onTouchEnd(e) {
      const endX = e.changedTouches[0].screenX;
      const diff = endX - this.touchStartX;
      if (diff > 50) {
        this.prevMonth();
      } else if (diff < -50) {
        this.nextMonth();
      }
      this.touchStartX = null;
    }
  }
};
</script>
