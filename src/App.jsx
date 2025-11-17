import { useMemo, useState } from 'react'
import './App.css'

const StatusBar = () => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <div className="chip">63</div>
        <span className="carrier">LTE</span>
        <div className="signal">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="bar" style={{ opacity: (i + 1) / 4 }} />
          ))}
        </div>
      </div>
      <div className="clock">10:44</div>
    </div>
  )
}

const InputRow = ({ label, placeholder, icon, type = 'text' }) => {
  return (
    <div className="input-row">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          defaultValue={placeholder}
          className="text-input"
          dir="ltr"
        />
        <span className="input-icon">{icon}</span>
      </div>
      <div className="divider" />
    </div>
  )
}

const PinRow = () => {
  return (
    <div className="pin-row">
      <label className="input-label">الرقم السري</label>
      <div className="pin-wrapper">
        <div className="pin-dots">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="pin-dot" />
          ))}
        </div>
        <span className="input-icon">
          <LockIcon />
        </span>
      </div>
    </div>
  )
}

const QuickTile = ({ title, icon, onClick }) => (
  <button className="quick-tile" onClick={onClick} type="button">
    <div className="quick-icon">{icon}</div>
    <div className="quick-title">{title}</div>
  </button>
)

const GridTile = ({ title, icon, accent }) => (
  <div className={`grid-tile ${accent ? 'accent' : ''}`}>
    <div className="grid-icon">{icon}</div>
    <div className="grid-title">{title}</div>
  </div>
)

const BottomNav = ({ active }) => {
  const items = useMemo(
    () => [
      { key: 'help', label: 'المساعدة', icon: <HelpIcon /> },
      { key: 'alerts', label: 'الاشعارات', icon: <BellIcon /> },
      { key: 'fav', label: 'المفضلة', icon: <StarIcon /> },
      { key: 'home', label: 'الرئيسية', icon: <HomeIcon /> },
    ],
    []
  )

  return (
    <div className="bottom-nav">
      {items.map((item) => (
        <div
          key={item.key}
          className={`nav-item ${active === item.key ? 'active' : ''}`}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="screen login-screen" dir="rtl">
      <StatusBar />
      <div className="brand-block">
        <div className="brand-logo">
          <div className="logo-symbol">BPM</div>
          <div className="logo-text">
            <span className="logo-en">Bankily</span>
            <span className="logo-ar">بنكيلي</span>
            <span className="logo-sub">PAR BPM</span>
          </div>
        </div>
      </div>

      <div className="form-area">
        <InputRow
          label="اسم المستخدم أو رقم الهاتف"
          placeholder="34605765"
          icon={<UserIcon />}
        />
        <PinRow />
        <a className="link" href="#">
          نسيت الرقم السري؟
        </a>
        <a className="link" href="#">
          مستخدم جديد ؟ سجل الآن!
        </a>
      </div>

      <button className="primary-btn" onClick={onLogin} type="button">
        تسجيل الدخول
      </button>
      <div className="home-indicator" />
    </div>
  )
}

const DashboardScreen = ({ onTransfer }) => {
  const quickActions = [
    { title: 'تسديد مشتريات', icon: <CartIcon /> },
    { title: 'تحويل الأموال', icon: <MoneyIcon />, onClick: onTransfer },
    { title: 'حسابي', icon: <PaperIcon /> },
  ]

  const services = [
    { title: 'تعبئة رصيد الهاتف', icon: <TopupIcon /> },
    { title: 'تسديد الفواتير', icon: <BillIcon /> },
    { title: 'طلب دفتر شيكات', icon: <CheckBookIcon /> },
    { title: 'البطاقات البنكية', icon: <CardIcon />, accent: true },
    { title: 'سحب النقود', icon: <CashIcon /> },
    { title: 'ب-باي', icon: <ShopIcon />, accent: true },
    { title: 'جميلل', icon: <GmailIcon /> },
  ]

  return (
    <div className="screen dashboard-screen" dir="rtl">
      <StatusBar />
      <div className="hero">
        <div className="menu-icon">
          <MenuIcon />
        </div>
        <div className="hero-title">لوحة القيادة</div>
        <div />
      </div>

      <div className="quick-actions">
        {quickActions.map((item) => (
          <QuickTile key={item.title} {...item} />
        ))}
      </div>

      <div className="grid">
        {services.map((service) => (
          <GridTile key={service.title} {...service} />
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  )
}

const TransferScreen = ({ onBack, onSend }) => {
  return (
    <div className="screen transfer-screen" dir="rtl">
      <StatusBar />
      <div className="transfer-hero">
        <div className="transfer-header">
          <button className="icon-button" onClick={onBack} type="button">
            <ArrowRightIcon />
          </button>
          <div className="transfer-title">تحويل أموال</div>
          <div className="header-spacer" />
        </div>

        <div className="transfer-actions">
          <button className="transfer-card gold" type="button">
            <MoneySwitchIcon />
            <div className="card-title">طلب المال</div>
          </button>
          <button className="transfer-card teal" onClick={onSend} type="button">
            <MoneySendIcon />
            <div className="card-title">إرسال الأموال</div>
          </button>
        </div>
      </div>

      <div className="transfer-body">
        <div className="section-title">التحويل السريع</div>

        <div className="qr-card">
          <QrIcon />
          <div className="qr-title">رمز QR</div>
        </div>

        <div className="board">
          <div className="section-subtitle">اللوحة</div>
          <div className="board-row">
            <div className="board-text">
              أنشئ مجموعة جديدة أو حدد مجموعة حالية لتقسيم اللوحة.
            </div>
            <button className="add-card" type="button">
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  )
}

const SendMoneyScreen = ({ onBack }) => {
  const [showReceipt, setShowReceipt] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    amount: '',
    note: '',
  })
  const [receiptTime, setReceiptTime] = useState('')

  const displayPhone = form.phone.trim() || '34336521'
  const displayAmount = form.amount.trim() || '8'
  const displayDateTime = receiptTime || '25-11-15 21:38:05'

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const formatDateTime = () => {
    const now = new Date()
    const pad = (n) => n.toString().padStart(2, '0')
    const yy = now.getFullYear().toString().slice(-2)
    const mm = pad(now.getMonth() + 1)
    const dd = pad(now.getDate())
    const hh = pad(now.getHours())
    const mi = pad(now.getMinutes())
    const ss = pad(now.getSeconds())
    return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`
  }

  const handleSend = () => {
    setReceiptTime(formatDateTime())
    setShowReceipt(true)
  }
  const tabs = [
    { key: 'phone', label: 'رقم الهاتف', icon: <PhoneTabIcon />, active: true },
    { key: 'username', label: 'اسم المستخدم', icon: <UserTabIcon /> },
    { key: 'bank', label: 'بنك', icon: <BankTabIcon /> },
    { key: 'fb', label: 'فيسبوك', icon: <FacebookTabIcon /> },
  ]

  return (
    <div className="screen send-screen" dir="rtl">
      <StatusBar />
      <div className="send-hero">
        <div className="transfer-header">
          <button className="icon-button" onClick={onBack} type="button">
            <ArrowRightIcon />
          </button>
          <div className="transfer-title">إرسال الأموال</div>
          <div className="header-spacer" />
        </div>
        <div className="send-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`send-tab ${tab.active ? 'active' : ''}`}
            >
              <div className="tab-icon">{tab.icon}</div>
              <div className="tab-label">{tab.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="send-body">
        <div className="form-field">
          <div className="field-icon">
            <ContactBookIcon />
          </div>
          <div className="field-content">
            <label className="field-label">رقم الهاتف</label>
            <input
              className="field-input"
              placeholder=""
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>
        </div>

        <div className="field-divider" />

        <div className="form-field">
          <div className="field-content">
            <label className="field-label">المبلغ</label>
            <input
              className="field-input"
              placeholder=""
              value={form.amount}
              onChange={handleChange('amount')}
            />
          </div>
        </div>

        <div className="field-divider" />

        <div className="form-field">
          <div className="field-content">
            <label className="field-label">ملاحظة (اختياري)</label>
            <input
              className="field-input"
              placeholder=""
              value={form.note}
              onChange={handleChange('note')}
            />
          </div>
        </div>

        <div className="field-divider" />
      </div>

      <button className="primary-btn send-btn" onClick={handleSend} type="button">
        إرسال
      </button>
      <div className="home-indicator" />

      {showReceipt && (
        <div className="overlay">
          <div className="toast">
            <div className="toast-left">
              <div className="toast-title">تحويل أموال</div>
              <div className="toast-sub">{`المبلغ : ${displayAmount} أوقية`}</div>
              <div className="toast-sub">
                {`المستفيد: MOHAMED YAHYA HEMETH, ${displayPhone.slice(0, 3)}...`}
              </div>
            </div>
            <div className="toast-logo">Bankily</div>
          </div>

          <div className="receipt-card">
            <div className="receipt-title">النقل ناجح!</div>
            <div className="receipt-icon">
              <CheckCircleIcon />
            </div>
            <div className="receipt-line">
              <span>{` المستفيد: ${displayPhone} `}</span>
              <span>{`المبلغ المرسل :  MRU ${displayAmount}  `}</span>&nbsp;
              
            </div>
            <div className="receipt-line">  معرف المعامله : 0225111521380341722     </div>
            <div className="receipt-line">{`التاريخ والوقت: ${displayDateTime}`}</div>
            <div className="receipt-line star-line">
             <StarFilledIcon /> تعيين كمفضل 
            </div>
            <button
              className="receipt-btn"
              onClick={() => setShowReceipt(false)}
              type="button"
            >
              فعله!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('login')

  if (screen === 'login') {
    return <LoginScreen onLogin={() => setScreen('dashboard')} />
  }

  if (screen === 'transfer') {
    return (
      <TransferScreen
        onBack={() => setScreen('dashboard')}
        onSend={() => setScreen('send')}
      />
    )
  }

  if (screen === 'send') {
    return <SendMoneyScreen onBack={() => setScreen('transfer')} />
  }

  return <DashboardScreen onTransfer={() => setScreen('transfer')} />
}

const UserIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 20c0-3 3.5-5 8-5s8 2 8 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 11V8a4 4 0 1 1 8 0v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1.2" fill="currentColor" />
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
    <path
      d="M4 5h16l-1.6 7.2A2 2 0 0 1 16.45 14H8.1L7 6H4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="18" r="1.2" fill="currentColor" />
    <circle cx="16" cy="18" r="1.2" fill="currentColor" />
  </svg>
)

const MoneyIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M8 10h8m-3 2.5h4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="10" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

const PaperIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
    <path
      d="M7 4.5h10v15H7z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9.5 9.5h5M9.5 13h5M9.5 16.5H13" stroke="currentColor" />
  </svg>
)

const TopupIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <rect
      x="7"
      y="3"
      width="10"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 8v5m0 0 2-2m-2 2-2-2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BillIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <path
      d="M7 5h10v14l-2-1-2 1-2-1-2 1-2-1z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9.5 9h5M9.5 12h5M9.5 15H13" stroke="currentColor" />
  </svg>
)

const CheckBookIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M7 10h10M7 13h5m-3 3h3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const CardIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <rect
      x="3"
      y="6"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="currentColor"
      fillOpacity="0.07"
    />
    <path
      d="M3 10h18M8 14h3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

const CashIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <rect
      x="4"
      y="5"
      width="16"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 9.5h1.5M14.5 14.5H16"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const ShopIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <rect
      x="5"
      y="6"
      width="14"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M9 9h6v6H9z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fill="currentColor"
    >
      G
    </text>
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M10.5 9a1.5 1.5 0 0 1 3 0c0 1-1.5 1.25-1.5 2.5v.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="16" r=".9" fill="currentColor" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M7 9a5 5 0 0 1 10 0v4.5l1.5 1.5H5.5L7 13.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M10 18a2 2 0 0 0 4 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="m12 4 2.1 4.7 5.1.4-3.9 3.3 1.2 5-4.5-2.7-4.5 2.7 1.2-5-3.9-3.3 5.1-.4z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="m5 11 7-6 7 6v7a1 1 0 0 1-1 1h-4.5V13h-3V19H6a1 1 0 0 1-1-1Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="m10 7 5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MoneySwitchIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path
      d="M5 8h8m6 8H11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m9 5 3 3-3 3M15 13l-3 3 3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MoneySendIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path
      d="M4.5 12H14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="m11 8 4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 7h6a4 4 0 0 1 4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const QrIcon = () => (
  <svg viewBox="0 0 28 28" width="36" height="36" fill="none">
    <path
      d="M6 6h5v5H6zM17 6h5v5h-5zM6 17h5v5H6zM17 17h2v2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M14 12v4M12 14h4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M21 17v5h-5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const PhoneTabIcon = () => (
  <svg viewBox="0 0 32 32" width="38" height="38" fill="none">
    <rect
      x="9"
      y="6"
      width="14"
      height="20"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="16" cy="23.5" r="1.2" fill="currentColor" />
  </svg>
)

const UserTabIcon = () => (
  <svg viewBox="0 0 32 32" width="38" height="38" fill="none">
    <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M6 25c1.5-3.5 5-5.5 10-5.5s8.5 2 10 5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

const BankTabIcon = () => (
  <svg viewBox="0 0 32 32" width="38" height="38" fill="none">
    <path
      d="M6 12h20M9 12v12M23 12v12M6 24h20M5 12l11-6 11 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

const FacebookTabIcon = () => (
  <svg viewBox="0 0 32 32" width="38" height="38" fill="none">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M17 10h2.5M17 10a2 2 0 0 0-2 2v10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M12.5 14H17" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

const ContactBookIcon = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
    <rect
      x="6"
      y="5"
      width="15.5"
      height="18"
      rx="2"
      stroke="#f1c04c"
      strokeWidth="1.6"
    />
    <path
      d="M8 9h2m-2 4h2m-2 4h2"
      stroke="#f1c04c"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M17 12.5c0-1.1-.9-2-2-2h-.7a.8.8 0 0 0-.8.7c-.1 1 .2 2 .8 2.6.6.6 1.6.9 2.6.8a.8.8 0 0 0 .7-.8V13c0-.3-.1-.3-.3-.4l-.6-.1-.3-.1"
      stroke="#f1c04c"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg viewBox="0 0 64 64" width="62" height="62" fill="none">
    <circle cx="32" cy="32" r="30" stroke="#36b24b" strokeWidth="4" fill="#f5fff7" />
    <path
      d="m18 33 9 9 19-19"
      stroke="#36b24b"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const StarFilledIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="m12 3 2.5 5.6 6 .5-4.5 4 1.4 5.9L12 16.8 6.6 19l1.4-5.9-4.5-4 6-.5z" />
  </svg>
)

export default App
