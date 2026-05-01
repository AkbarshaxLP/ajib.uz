import { BookOpen, Bot, Settings2, SquareTerminal, Command } from 'lucide-vue-next'

export const options = {
  head: {
    title: 'Uninetworks',
    description: '',
    logo: Command,
  },
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Дашборд',
      url: '/admin/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Продукты',
      url: '/admin/products',
      icon: Bot,
    },
    {
      title: 'Главная страница',
      url: '/admin/main-page',
      icon: BookOpen,
    },
    {
      title: 'Подвал',
      url: '/admin/footer',
      icon: Settings2,
    },
  ],
}
