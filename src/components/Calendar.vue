<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <!-- ナビゲーション -->
    <div id="calendarHeader">
      <button @click="prevMonth">◀︎</button>
      <h2 id="currentMonth">{{ viewYear }}年 {{ viewMonth + 1 }}月</h2>
      <button @click="nextMonth">▶︎</button>
    </div>

    <!-- カレンダー本体 -->
    <div id="calendarContainer">
      <transition :name="'slide-' + slideDirection" mode="out-in">
        <div
          :key="viewYear + '-' + viewMonth"
          id="calendar"
          :style="{ transform: `translateX(${translateX}px)` }"
          :class="{ dragging: isDragging }"
        >
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
      </transition>
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
      touchStartX: null,
      slideDirection: 'left',
      translateX: 0,
      isDragging: false
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
      this.slideDirection = 'right';
      this.viewMonth--;
      if (this.viewMonth < 0) {
        this.viewMonth = 11;
        this.viewYear--;
      }
      this.selectedDay = null;
    },
    nextMonth() {
      this.slideDirection = 'left';
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
      this.touchStartX = e.touches[0].screenX;
      this.isDragging = true;
    },
    onTouchMove(e) {
      if (!this.isDragging) return;
      this.translateX = e.touches[0].screenX - this.touchStartX;
    },
    onTouchEnd(e) {
      if (!this.isDragging) return;
      const endX = e.changedTouches[0].screenX;
      const diff = endX - this.touchStartX;
      this.isDragging = false;
      this.translateX = 0;
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

<style scoped>
#calendarContainer {
  position: relative;
  overflow: hidden;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.slide-left-enter-from { transform: translateX(100%); }
.slide-left-leave-to   { transform: translateX(-100%); }
.slide-right-enter-from { transform: translateX(-100%); }
.slide-right-leave-to   { transform: translateX(100%); }

#calendar {
  transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.dragging {
  transition: none !important;
}
</style>
