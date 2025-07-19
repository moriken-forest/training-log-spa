<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <!-- ナビゲーション -->
    <div id="calendarHeader">
      <button @click="prevMonthButton">◀︎</button>
      <h2 id="currentMonth">{{ viewYear }}年 {{ viewMonth + 1 }}月</h2>
      <button @click="nextMonthButton">▶︎</button>
    </div>

    <!-- 曜日ヘッダー -->
    <div id="weekdayHeader">
      <div v-for="w in weekdays" :key="w" class="weekday">
        {{ w }}
      </div>
    </div>

    <!-- カレンダー本体 -->
    <div id="calendarContainer" ref="container">
      <div id="calendarWrapper" :style="wrapperStyle" @transitionend="onTransitionEnd">
        <div class="month" :key="prevYear + '-' + prevMonthIndex">
          <div v-for="n in firstDayOf(prevYear, prevMonthIndex)" :key="'pe'+n" class="day-cell disabled"></div>
          <div
            v-for="day in daysInMonthOf(prevYear, prevMonthIndex)"
            :key="'p'+day"
            :class="[
              'day-cell',
              isLogOf(prevYear, prevMonthIndex, day) ? 'has-log' : (isScheduleOf(prevYear, prevMonthIndex, day) ? 'has-schedule' : 'disabled'),
              isTodayOf(prevYear, prevMonthIndex, day) ? 'today' : ''
            ]"
            @click="selectDateOf(prevYear, prevMonthIndex, day)"
          >
            {{ day }}
          </div>
        </div>
        <div class="month" :key="viewYear + '-' + viewMonth">
          <div v-for="n in firstDay" :key="'ce'+n" class="day-cell disabled"></div>
          <div
            v-for="day in daysInMonth"
            :key="'c'+day"
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
        <div class="month" :key="nextYear + '-' + nextMonthIndex">
          <div v-for="n in firstDayOf(nextYear, nextMonthIndex)" :key="'ne'+n" class="day-cell disabled"></div>
          <div
            v-for="day in daysInMonthOf(nextYear, nextMonthIndex)"
            :key="'n'+day"
            :class="[
              'day-cell',
              isLogOf(nextYear, nextMonthIndex, day) ? 'has-log' : (isScheduleOf(nextYear, nextMonthIndex, day) ? 'has-schedule' : 'disabled'),
              isTodayOf(nextYear, nextMonthIndex, day) ? 'today' : ''
            ]"
            @click="selectDateOf(nextYear, nextMonthIndex, day)"
          >
            {{ day }}
          </div>
        </div>
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
    },
    selectedDate: {
      type: String,
      default: ''
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
      touchStartX: null,
      dragOffset: 0,
      dragging: false,
      containerWidth: 0,
      currentTranslate: 0,
      slideTarget: null,
      animating: false
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
    },
    prevMonthIndex() {
      return (this.viewMonth + 11) % 12;
    },
    prevYear() {
      return this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear;
    },
    nextMonthIndex() {
      return (this.viewMonth + 1) % 12;
    },
    nextYear() {
      return this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
    },
    wrapperStyle() {
      const translate = this.currentTranslate + (this.dragging ? this.dragOffset : 0);
      return {
        transform: `translateX(${translate}px)`,
        transition: this.animating ? 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
        display: 'flex',
        width: '300%'
      };
    }
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler(val) {
        if (!val) return;
        const d = new Date(val);
        if (isNaN(d)) return;
        this.viewYear = d.getFullYear();
        this.viewMonth = d.getMonth();
        this.selectedDay = d.getDate();
      }
    }
  },
  methods: {
    formatYMD(y, m, d) {
      return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    },
    isLogOf(y, m, d) {
      return this.logDates.includes(this.formatYMD(y, m, d));
    },
    isScheduleOf(y, m, d) {
      return this.scheduleDates.includes(this.formatYMD(y, m, d));
    },
    isTodayOf(y, m, d) {
      return this.todayYear === y && this.todayMonth === m && this.todayDate === d;
    },
    selectDateOf(y, m, d) {
      if (!this.isLogOf(y, m, d) && !this.isScheduleOf(y, m, d)) return;
      this.viewYear = y;
      this.viewMonth = m;
      this.selectedDay = d;
      this.$emit('select-date', this.formatYMD(y, m, d));
    },
    // shortcuts for current month
    isLog(day) { return this.isLogOf(this.viewYear, this.viewMonth, day); },
    isSchedule(day) { return this.isScheduleOf(this.viewYear, this.viewMonth, day); },
    isToday(day) { return this.isTodayOf(this.viewYear, this.viewMonth, day); },
    // month adjustments
    prevMonthInternal() {
      this.viewMonth--;
      if (this.viewMonth < 0) {
        this.viewMonth = 11;
        this.viewYear--;
      }
      this.selectedDay = null;
    },
    nextMonthInternal() {
      this.viewMonth++;
      if (this.viewMonth > 11) {
        this.viewMonth = 0;
        this.viewYear++;
      }
      this.selectedDay = null;
    },
    startAnimation(dir) {
      this.containerWidth = this.$refs.container.clientWidth;
      this.slideTarget = dir;
      this.animating = true;
      if (dir === 'prev') {
        this.currentTranslate = 0;
      } else if (dir === 'next') {
        this.currentTranslate = -2 * this.containerWidth;
      } else {
        this.currentTranslate = -this.containerWidth;
      }
    },
    prevMonthButton() { this.startAnimation('prev'); },
    nextMonthButton() { this.startAnimation('next'); },
    selectDate(day) { this.selectDateOf(this.viewYear, this.viewMonth, day); },
    onTouchStart(e) {
      this.touchStartX = e.touches[0].screenX;
      this.dragging = true;
      this.containerWidth = this.$refs.container.clientWidth;
    },
    onTouchMove(e) {
      if (!this.dragging) return;
      this.dragOffset = e.touches[0].screenX - this.touchStartX;
    },
    onTouchEnd(e) {
      if (!this.dragging) return;
      const diff = e.changedTouches[0].screenX - this.touchStartX;
      if (diff > 50) {
        this.startAnimation('prev');
      } else if (diff < -50) {
        this.startAnimation('next');
      } else {
        this.startAnimation(null);
      }
      this.dragging = false;
      this.dragOffset = 0;
      this.touchStartX = null;
    },
    onTransitionEnd() {
      if (this.slideTarget === 'next') {
        this.nextMonthInternal();
      } else if (this.slideTarget === 'prev') {
        this.prevMonthInternal();
      }
      this.animating = false;
      this.slideTarget = null;
      this.$nextTick(() => {
        this.currentTranslate = -this.containerWidth;
      });
    },
    firstDayOf(y, m) {
      const day = new Date(y, m, 1).getDay();
      return (day + 6) % 7;
    },
    daysInMonthOf(y, m) {
      return new Date(y, m + 1, 0).getDate();
    }
  }
};
</script>

<style scoped>
#calendarContainer {
  position: relative;
  overflow: hidden;
  touch-action: pan-x;
}

#calendarWrapper {
  display: flex;
  width: 300%;
}

.month {
  width: 100%;
}
</style>
