import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const [currentDate] = useState(new Date());

  // Get month name in Russian
  const getMonthName = (month: number): string => {
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return monthNames[month];
  };

  // Generate calendar data
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();

    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust for Sunday being 0 to make Monday the first day of the week
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // Last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    // Calendar data
    const calendarDays = [];
    let dayCounter = 1;

    // Generate 5 weeks
    for (let week = 0; week < 5; week++) {
      const weekDays = [];

      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDayIndex) {
          // Days from previous month
          const prevMonthDay = lastDayOfPrevMonth - firstDayIndex + day + 1;
          weekDays.push({
            day: prevMonthDay,
            isCurrentMonth: false,
            isToday: false,
            isDisabled: true
          });
        } else if (dayCounter <= lastDayOfMonth) {
          // Days from current month
          weekDays.push({
            day: dayCounter,
            isCurrentMonth: true,
            isToday: dayCounter === today,
            isDisabled: false
          });
          dayCounter++;
        } else {
          // Days from next month
          const nextMonthDay = dayCounter - lastDayOfMonth;
          weekDays.push({
            day: nextMonthDay,
            isCurrentMonth: false,
            isToday: false,
            isDisabled: false
          });
          dayCounter++;
        }
      }

      calendarDays.push(weekDays);
    }

    return calendarDays;
  };

  const calendarData = generateCalendarData();
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="header-row">
          <div className="header-left-column">
            <div className="main-title">Find my tutor</div>
          </div>
          <div className="header-right-column">
            <div className="nav-buttons-container">
              <div className="nav-buttons-row">
                <div className="nav-button-column">
                  <div className="nav-button back-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
                <div className="nav-button-column">
                  <div className="nav-button contact-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
                <div className="nav-button-column">
                  <div className="nav-button forward-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/da85ec3f5c371762db65cee6a272c01b19efba18?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-title">Ваша информация</div>
      <div className="profile-dashboard">
        <div className="sidebar-menu">
          <div className="menu-item">Ваша анкета</div>
          <div className="menu-item">Вы на одной волне</div>
          <div className="menu-item">Архив занятий</div>
          <div className="menu-item">Настройки</div>
          <div className="menu-item">Выход</div>
        </div>
        <div className="calendar-section">
          <div className="calendar-title">Календарь занятий</div>
          <div className="calendar-month">{getMonthName(currentDate.getMonth())}, {currentDate.getFullYear()}</div>
          <div className="calendar-grid">
            {calendarData.map((week, weekIndex) => (
              <div className="calendar-week" key={`week-${weekIndex}`}>
                {week.map((day, dayIndex) => (
                  <div 
                    className={`calendar-day ${day.isToday ? 'current-day' : ''} ${day.isDisabled ? 'disabled' : ''}`}
                    key={`day-${weekIndex}-${dayIndex}`}
                  >
                    {day.day > 0 ? day.day : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="profile-footer">
        <div className="footer-content">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-about">О нас</div>
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-privacy">Обработка персональных данных</div>
          <div className="footer-policy">Политика конфиденциальности</div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
