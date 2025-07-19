import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

function Index() {
  const [loanAmount, setLoanAmount] = useState(50000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Расчет ежемесячного платежа
  const calculatePayment = () => {
    const rate = 0.15 / 12 // 15% годовых
    const n = loanTerm
    const payment = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
    setMonthlyPayment(Math.round(payment))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
              <Icon name="CreditCard" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">МикроФинанс</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#calculator" className="text-gray-700 hover:text-blue-600 transition-colors">Калькулятор</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Услуги</a>
            <a href="#documents" className="text-gray-700 hover:text-blue-600 transition-colors">Документы</a>
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
              Быстрые займы
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                без лишних вопросов
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Получите деньги уже сегодня. Минимум документов, максимум удобства. 
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 border-0 rounded-3xl shadow-2xl">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Готовы получить займ?</h2>
              <p className="text-xl mb-8 opacity-90">Подайте заявку прямо сейчас и получите деньги уже сегодня</p>
              <div id="application-form" className="flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-auto p-6">
                  <CardHeader>
                    <CardTitle className="text-center text-gray-900">Заявка на займ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО</Label>
                      <Input id="name" placeholder="Иванов Иван Иванович" className="rounded-2xl" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+7 (999) 123-45-67" className="rounded-2xl" />
                    </div>
                    <div>
                      <Label htmlFor="amount">Сумма займа</Label>
                      <Input id="amount" placeholder="50 000 ₽" className="rounded-2xl" />
                    </div>
                    <div>
                      <Label htmlFor="term">Срок займа (дней)</Label>
                      <Input id="term" placeholder="30" className="rounded-2xl" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl">
                      Подать заявку
                    </Button>
                  </CardContent>
                </Card>
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
                  <Icon name="CreditCard" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">МикроФинанс</span>
              </div>
              <p className="text-gray-400">Надежный партнер в мире финансов</p>
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
            <p>&copy; 2024 МикроФинанс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index