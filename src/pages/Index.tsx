import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

function Index() {
  const [loanAmount, setLoanAmount] = useState(50000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  // Состояния для многошаговой формы
  const [applicationStep, setApplicationStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    passport: '',
    email: '',
    income: '',
    amount: 50000,
    term: 30
  })

  // Состояния для чата
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Здравствуйте! 👋 Я консультант Анна. Как дела с займом?",
      isBot: true,
      time: "Сейчас"
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Расчет ежемесячного платежа
  const calculatePayment = () => {
    const rate = 0.15 / 12 // 15% годовых
    const n = loanTerm
    const payment = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
    setMonthlyPayment(Math.round(payment))
  }

  // Функции для работы с формой заявки
  const nextStep = () => {
    if (applicationStep < 4) {
      setIsLoading(true)
      setTimeout(() => {
        setApplicationStep(applicationStep + 1)
        setIsLoading(false)
      }, 2000)
    }
  }

  const submitApplication = () => {
    setIsLoading(true)
    setTimeout(() => {
      setApplicationStep(4) // Финальный этап
      setIsLoading(false)
    }, 3000)
  }

  const renderApplicationForm = () => {
    const steps = [
      'Идентификация',
      'Загрузка данных',
      'Ожидание',
      'Анкета',
      'Готово'
    ]

    if (isLoading) {
      return (
        <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-8">
          <CardContent className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold mb-2">
              {applicationStep === 0 && "Проверяем данные..."}
              {applicationStep === 1 && "Загружаем информацию..."}
              {applicationStep === 2 && "Обрабатываем заявку..."}
              {applicationStep === 3 && "Оформляем займ..."}
            </h3>
            <p className="text-gray-600">Пожалуйста, подождите</p>
            <Progress value={(applicationStep + 1) * 20} className="mt-4" />
          </CardContent>
        </Card>
      )
    }

    switch (applicationStep) {
      case 0: // Идентификация
        return (
          <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 flex items-center justify-center">
                <Icon name="UserCheck" className="mr-2" />
                Идентификация
              </CardTitle>
              <Progress value={20} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">ФИО *</Label>
                <Input 
                  id="name" 
                  placeholder="Иванов Иван Иванович" 
                  className="rounded-2xl"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input 
                  id="phone" 
                  placeholder="+7 (999) 123-45-67" 
                  className="rounded-2xl"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="passport">Серия и номер паспорта *</Label>
                <Input 
                  id="passport" 
                  placeholder="1234 567890" 
                  className="rounded-2xl"
                  value={formData.passport}
                  onChange={(e) => setFormData({...formData, passport: e.target.value})}
                />
              </div>
              <Button 
                onClick={nextStep}
                disabled={!formData.name || !formData.phone || !formData.passport}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl"
              >
                Продолжить
              </Button>
            </CardContent>
          </Card>
        )

      case 1: // Загрузка данных
        return (
          <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 flex items-center justify-center">
                <Icon name="Upload" className="mr-2" />
                Дополнительные данные
              </CardTitle>
              <Progress value={40} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="ivan@example.com" 
                  className="rounded-2xl"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="income">Ежемесячный доход (₽)</Label>
                <Input 
                  id="income" 
                  placeholder="50 000" 
                  className="rounded-2xl"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <h4 className="font-semibold mb-2">Загрузка документов</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Паспорт (фото)</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Справка о доходах</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl"
              >
                Загрузить данные
              </Button>
            </CardContent>
          </Card>
        )

      case 2: // Ожидание
        return (
          <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 flex items-center justify-center">
                <Icon name="Clock" className="mr-2" />
                Проверка заявки
              </CardTitle>
              <Progress value={60} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchCheck" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold">Анализируем вашу заявку</h3>
              <p className="text-gray-600">
                Проверяем кредитную историю и платежеспособность. 
                Обычно это занимает 2-5 минут.
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl text-left">
                <h4 className="font-semibold mb-2">Что мы проверяем:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Кредитная история в БКИ</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Проверка в ФССП</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Анализ платежеспособности</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl"
              >
                Продолжить проверку
              </Button>
            </CardContent>
          </Card>
        )

      case 3: // Анкета
        return (
          <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 flex items-center justify-center">
                <Icon name="FileText" className="mr-2" />
                Параметры займа
              </CardTitle>
              <Progress value={80} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Сумма займа: {formData.amount.toLocaleString()} ₽</Label>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full h-3 bg-gray-200 rounded-2xl appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <Label>Срок займа: {formData.term} дней</Label>
                <input
                  type="range"
                  min="7"
                  max="365"
                  step="7"
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: Number(e.target.value)})}
                  className="w-full h-3 bg-gray-200 rounded-2xl appearance-none cursor-pointer slider"
                />
              </div>
              <div className="bg-green-50 p-4 rounded-2xl">
                <h4 className="font-semibold text-green-800 mb-2">Одобрено!</h4>
                <div className="text-sm text-green-700">
                  <p>Сумма: {formData.amount.toLocaleString()} ₽</p>
                  <p>Срок: {formData.term} дней</p>
                  <p>Ставка: 0.8% в день</p>
                </div>
              </div>
              <Button 
                onClick={submitApplication}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-2xl"
              >
                Оформить займ
              </Button>
            </CardContent>
          </Card>
        )

      case 4: // Готово
        return (
          <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 flex items-center justify-center">
                <Icon name="CheckCircle" className="mr-2 text-green-600" />
                Займ оформлен!
              </CardTitle>
              <Progress value={100} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">Поздравляем!</h3>
              <p className="text-gray-600">
                Ваш займ на {formData.amount.toLocaleString()} ₽ успешно оформлен. 
                Деньги поступят на счет в течение 15 минут.
              </p>
              <div className="bg-blue-50 p-4 rounded-2xl text-left">
                <h4 className="font-semibold mb-2">Номер договора: #МФ-2024-001234</h4>
                <div className="text-sm space-y-1">
                  <p>Сумма: {formData.amount.toLocaleString()} ₽</p>
                  <p>Срок: {formData.term} дней</p>
                  <p>К возврату: {(formData.amount * 1.24).toLocaleString()} ₽</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl"
                  onClick={() => window.open('https://microfinans.ru/cabinet', '_blank')}
                >
                  <Icon name="ExternalLink" className="mr-2" size={16} />
                  Перейти в личный кабинет
                </Button>
                <Button 
                  variant="outline"
                  className="w-full rounded-2xl"
                  onClick={() => setApplicationStep(0)}
                >
                  Оформить еще один займ
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  // Функции для чата
  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: newMessage,
        isBot: false,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
      
      setChatMessages([...chatMessages, userMessage])
      setNewMessage('')
      setIsTyping(true)

      // Симуляция ответа бота
      setTimeout(() => {
        const botResponses = [
          "Спасибо за ваш вопрос! Наш специалист свяжется с вами в ближайшее время.",
          "Для быстрого оформления займа нажмите кнопку 'Оформить заявку' на сайте.",
          "По всем вопросам звоните: 8 (800) 555-35-35. Работаем круглосуточно!",
          "Максимальная сумма займа - 500 000 ₽. Минимальная - 5 000 ₽.",
          "Первый займ под 0% на 30 дней для новых клиентов!"
        ]
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage = {
          id: chatMessages.length + 2,
          text: randomResponse,
          isBot: true,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        }
        
        setIsTyping(false)
        setChatMessages(prev => [...prev, botMessage])
      }, 1500)
    }
  }

  const renderChat = () => {
    if (!chatOpen) return null

    return (
      <div className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-scale-in">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-t-3xl flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={20} />
            </div>
            <div>
              <div className="font-semibold">Консультант Анна</div>
              <div className="text-xs opacity-80">Онлайн</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChatOpen(false)}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-br-md'
                }`}
              >
                <div className="text-sm">{message.text}</div>
                <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Напишите сообщение..."
              className="rounded-2xl"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl px-4"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
              <Icon name="Home" size={28} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Деньги в дом
              </span>
              <span className="text-xs text-gray-500 -mt-1">Быстрые займы онлайн</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#calculator" className="text-gray-700 hover:text-blue-600 transition-colors">Калькулятор</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Услуги</a>
            <a href="#documents" className="text-gray-700 hover:text-blue-600 transition-colors">Документы</a>
            <a href="#integration" className="text-gray-700 hover:text-blue-600 transition-colors">Интеграция</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Контакты</a>
          </nav>
          <Button onClick={() => setShowLoginModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-2xl">
            Личный кабинет
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Деньги к вам 
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                прямо домой
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Быстрые займы с доставкой на дом или карту. Минимум документов, максимум удобства. 
              От 5 000 до 500 000 рублей на срок до 365 дней.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl px-8"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Оформить заявку
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-8">
                Узнать больше
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5 мин</div>
                <div className="text-gray-600">Рассмотрение</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">Доступность</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">0%</div>
                <div className="text-gray-600">Первый займ</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl transform rotate-3 opacity-20 animate-glow"></div>
            <img 
              src="/img/2d9ed3b9-8bf4-409c-854a-2f44f10ad1ee.jpg" 
              alt="Финансовый консультант"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover animate-float"
            />
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Калькулятор займа</h2>
            <p className="text-xl text-gray-600">Рассчитайте условия займа прямо сейчас</p>
          </div>
          
          <Card className="max-w-2xl mx-auto rounded-3xl shadow-2xl border-0 bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Параметры займа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Сумма займа: {loanAmount.toLocaleString()} ₽</Label>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-2xl appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>5 000 ₽</span>
                  <span>500 000 ₽</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Срок займа: {loanTerm} дней</Label>
                <input
                  type="range"
                  min="7"
                  max="365"
                  step="7"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-2xl appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>7 дней</span>
                  <span>365 дней</span>
                </div>
              </div>

              <Button 
                onClick={calculatePayment} 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl py-4 text-lg"
              >
                Рассчитать платеж
              </Button>

              {monthlyPayment > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Ежемесячный платеж</div>
                  <div className="text-3xl font-bold text-blue-600">{monthlyPayment.toLocaleString()} ₽</div>
                  <div className="text-sm text-gray-600 mt-2">Переплата: {((monthlyPayment * (loanTerm/30)) - loanAmount).toLocaleString()} ₽</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600">Широкий спектр финансовых решений</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Banknote" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Микрозаймы</h3>
                <p className="text-gray-600 mb-6">До 30 000 ₽ на срок до 30 дней. Быстрое получение денег.</p>
                <Button variant="outline" className="rounded-2xl">Подробнее</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="CreditCard" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Потребительские займы</h3>
                <p className="text-gray-600 mb-6">До 500 000 ₽ на срок до 365 дней. Выгодные условия.</p>
                <Button variant="outline" className="rounded-2xl">Подробнее</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Building" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Бизнес займы</h3>
                <p className="text-gray-600 mb-6">Для развития бизнеса. Индивидуальные условия.</p>
                <Button variant="outline" className="rounded-2xl">Подробнее</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Документы</h2>
            <p className="text-xl text-gray-600">Минимальный пакет документов для получения займа</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
              <Icon name="IdCard" size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Паспорт</h3>
              <p className="text-gray-600 text-sm">Действующий паспорт гражданина РФ</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
              <Icon name="Phone" size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Телефон</h3>
              <p className="text-gray-600 text-sm">Мобильный номер для связи</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
              <Icon name="MapPin" size={48} className="text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Адрес</h3>
              <p className="text-gray-600 text-sm">Адрес регистрации или проживания</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
              <Icon name="FileText" size={48} className="text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Справка</h3>
              <p className="text-gray-600 text-sm">О доходах (при необходимости)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integration" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Интеграция и партнеры</h2>
            <p className="text-xl text-gray-600">Подключаемся к ведущим платформам и сервисам</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* API Integration */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mr-4">
                    <Icon name="Code" size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">API интеграция</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  REST API для интеграции с вашими системами. Полная документация и SDK для быстрого подключения.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>RESTful API с JWT авторизацией</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Webhook уведомления в реальном времени</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>SDK для популярных языков программирования</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Песочница для тестирования</span>
                  </div>
                </div>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700 rounded-2xl">
                  Документация API
                </Button>
              </CardContent>
            </Card>

            {/* Bank Integration */}
            <Card className="rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-4">
                    <Icon name="Landmark" size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Банковская интеграция</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Прямое подключение к банковским системам для мгновенных переводов и проверки платежеспособности.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Open Banking API</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Проверка кредитной истории в БКИ</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Мгновенные переводы СБП</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mr-2" />
                    <span>Автоматическое списание платежей</span>
                  </div>
                </div>
                <Button className="mt-6 bg-green-600 hover:bg-green-700 rounded-2xl">
                  Подключить банк
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Partners Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Наши технологические партнеры</h3>
            <p className="text-gray-600">Интеграция с ведущими финтех-решениями</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-3xl border-0 shadow-lg bg-white/60 backdrop-blur-sm p-6 text-center hover:shadow-xl transition-all">
              <Icon name="Smartphone" size={48} className="text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Мобильные платежи</h4>
              <p className="text-sm text-gray-600">Apple Pay, Google Pay, Samsung Pay</p>
            </Card>
            
            <Card className="rounded-3xl border-0 shadow-lg bg-white/60 backdrop-blur-sm p-6 text-center hover:shadow-xl transition-all">
              <Icon name="CreditCard" size={48} className="text-green-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Платежные системы</h4>
              <p className="text-sm text-gray-600">Visa, MasterCard, МИР, ЮMoney</p>
            </Card>
            
            <Card className="rounded-3xl border-0 shadow-lg bg-white/60 backdrop-blur-sm p-6 text-center hover:shadow-xl transition-all">
              <Icon name="Shield" size={48} className="text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Верификация</h4>
              <p className="text-sm text-gray-600">Госуслуги, БКИ, ФССП, МВД</p>
            </Card>
            
            <Card className="rounded-3xl border-0 shadow-lg bg-white/60 backdrop-blur-sm p-6 text-center hover:shadow-xl transition-all">
              <Icon name="MessageSquare" size={48} className="text-orange-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Уведомления</h4>
              <p className="text-sm text-gray-600">SMS, Email, Push, Telegram</p>
            </Card>
          </div>

          {/* Integration Examples */}
          <div className="mt-16">
            <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-r from-gray-50 to-blue-50 backdrop-blur-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8">Схема интеграции</h3>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Database" size={32} className="text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Ваша система</h4>
                    <p className="text-sm text-gray-600">CRM, ERP, веб-сайт</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Icon name="ArrowRight" size={32} className="text-gray-400" />
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Zap" size={32} className="text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Наш API</h4>
                    <p className="text-sm text-gray-600">REST API, Webhook</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl px-8">
                    Начать интеграцию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 border-0 rounded-3xl shadow-2xl">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Готовы получить займ?</h2>
              <p className="text-xl mb-8 opacity-90">Подайте заявку прямо сейчас и получите деньги уже сегодня</p>
              <div id="application-form" className="flex justify-center">
                {renderApplicationForm()}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                  <Icon name="Home" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">Деньги в дом</span>
              </div>
              <p className="text-gray-400">Доставляем деньги прямо к вам домой</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Микрозаймы</li>
                <li>Потребительские займы</li>
                <li>Бизнес займы</li>
                <li>Рефинансирование</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <ul className="space-y-2 text-gray-400">
                <li>О компании</li>
                <li>Лицензии</li>
                <li>Тарифы</li>
                <li>Правила</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>8 (800) 555-35-35</li>
                <li>info@microfinans.ru</li>
                <li>Москва, ул. Финансовая, 1</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Деньги в дом. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {renderChat()}
      
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full shadow-2xl animate-glow"
        >
          {chatOpen ? (
            <Icon name="X" size={24} className="text-white" />
          ) : (
            <div className="relative">
              <Icon name="MessageCircle" size={24} className="text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Index