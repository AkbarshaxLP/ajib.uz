import { BookOpen, Bot, Settings2, SquareTerminal, Command, Tag } from 'lucide-vue-next'

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
      title: 'Продукты',
      url: '/admin/products',
      icon: Bot,
    },
    {
      title: 'Категории',
      url: '/admin/categories',
      icon: Tag,
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
