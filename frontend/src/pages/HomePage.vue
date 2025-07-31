<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Добро пожаловать в мой мини-апп!</h1>
      <p class="subtitle">Создавайте что угодно с легкостью и стилем</p>
    </header>

    <section class="features">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="icon">{{ feature.icon }}</div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.description }}</p>
      </div>
    </section>

    <section class="cta-section">
      <button class="cta-button" @click="startNow">Начать сейчас</button>
    </section>

    <footer class="footer">
      <p>© 2024 Мой Мини-апп. Все права защищены.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          icon: '🚀',
          title: 'Быстрый старт',
          description: 'Запустите свое приложение за считанные минуты.',
        },
        {
          icon: '🎨',
          title: 'Настраиваемый дизайн',
          description: 'Поддержка темной и светлой темы, легко меняется внешний вид.',
        },
        {
          icon: '🔒',
          title: 'Безопасность',
          description: 'Ваши данные в безопасности благодаря нашим протоколам.',
        },
      ],
    };
  },
  methods: {
    startNow() {
      // Действие при клике, например, навигация или вызов API
      alert('Начинаем!');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f4f8;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Заголовок */
.header {
  text-align: center;
  padding: 50px 20px;
}

.title {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #4a90e2;
}

.subtitle {
  font-size: 1.2em;
  color: #666;
}

/* Блок с функциями */
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.feature-card {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  width: 300px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}

.icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.feature-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.feature-desc {
  font-size: 1em;
  color: #666;
}

/* CTA секция */
.cta-section {
  text-align: center;
  margin: 50px 0;
}

.cta-button {
  background-color: #4a90e2;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #357ab8;
}

/* Футер */
.footer {
  text-align: center;
  padding: 20px;
  font-size: 0.9em;
  color: #999;
}
</style>