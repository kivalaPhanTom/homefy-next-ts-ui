'use client'

import { useMemo, useState } from 'react'
import {
  HiOutlineUser,
  HiOutlineCamera,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
} from 'react-icons/hi2'
import { CiMail, CiPhone } from 'react-icons/ci'
import { useAppSelector } from '@/Redux/store'
import styles from './page.module.scss'

interface ProfileForm {
  lastName: string
  firstName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
}

const GENDERS = ['Nam', 'Nữ', 'Khác']

const INITIAL_FORM: ProfileForm = {
  lastName: 'Nguyễn Văn',
  firstName: 'An',
  email: 'nguyenvanan@gmail.com',
  phone: '0912 345 678',
  dateOfBirth: '1998-06-15',
  gender: 'Nam',
  address: 'Quận 1, TP. Hồ Chí Minh',
}

type ProfileTab = 'personal' | 'password'
type Notice = { type: 'success' | 'error'; message: string } | null

function Field({
  label,
  children,
  fullWidth,
}: {
  label: string
  children: React.ReactNode
  fullWidth?: boolean
}) {
  return (
    <div className={fullWidth ? styles.fieldFull : styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  )
}

function Page() {
  const usernameLogin = useAppSelector((state) => state.signInSlice?.usernameLogin ?? '')
  const [form, setForm] = useState<ProfileForm>(INITIAL_FORM)
  const [savedForm, setSavedForm] = useState<ProfileForm>(INITIAL_FORM)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')
  const [notice, setNotice] = useState<Notice>(null)

  const fullName = useMemo(
    () => `${form.lastName} ${form.firstName}`.trim(),
    [form.lastName, form.firstName]
  )
  const displayName = usernameLogin || fullName || 'Người dùng HOMEFY'

  const handleFormChange = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = (key: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [key]: value }))
  }

  const handlePersonalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setSavedForm(form)
    setNotice({ type: 'success', message: 'Thông tin cá nhân đã được cập nhật.' })
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    if (passwords.next.length < 8) {
      setNotice({ type: 'error', message: 'Mật khẩu mới cần có ít nhất 8 ký tự.' })
      return
    }
    if (passwords.next !== passwords.confirm) {
      setNotice({ type: 'error', message: 'Mật khẩu xác nhận không khớp.' })
      return
    }

    setPasswords({ current: '', next: '', confirm: '' })
    setNotice({ type: 'success', message: 'Mật khẩu đã được thay đổi.' })
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Hồ sơ người dùng</h1>
      <p className={styles.subtitle}>Quản lý thông tin cá nhân và bảo mật tài khoản của bạn</p>

      {/* ================= Avatar summary ================= */}
      <section className={styles.summaryCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <HiOutlineUser />
          </div>
          <button className={styles.avatarEditBtn} type='button' aria-label='Đổi ảnh đại diện'>
            <HiOutlineCamera />
          </button>
        </div>

        <div className={styles.summaryInfo}>
          <h2 className={styles.displayName}>{displayName}</h2>
          <div className={styles.summaryRows}>
            <span className={styles.summaryRow}>
              <CiMail />
              <span>{form.email}</span>
            </span>
            <span className={styles.summaryRow}>
              <CiPhone />
              <span>{form.phone}</span>
            </span>
          </div>
          <div className={styles.summaryBadges}>
            <span className={styles.verifiedBadge}>
              <HiOutlineShieldCheck />
              Đã xác minh
            </span>
            <span className={styles.memberSince}>Thành viên từ 10/2024</span>
          </div>
        </div>

        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <strong>8</strong>
            <span>Đặt phòng</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <strong>3</strong>
            <span>Đã hoàn thành</span>
          </div>
        </div>
      </section>

      <div className={styles.tabs} role='tablist' aria-label='Cài đặt hồ sơ'>
        <button
          className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
          id='personal-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'personal'}
          aria-controls='personal-panel'
          onClick={() => { setActiveTab('personal'); setNotice(null) }}
        >
          <HiOutlineUserCircle /> Thông tin cá nhân
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'password' ? styles.activeTab : ''}`}
          id='password-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'password'}
          aria-controls='password-panel'
          onClick={() => { setActiveTab('password'); setNotice(null) }}
        >
          <HiOutlineLockClosed /> Đổi mật khẩu
        </button>
      </div>

      {notice && (
        <p className={`${styles.notice} ${notice.type === 'success' ? styles.noticeSuccess : styles.noticeError}`} role={notice.type === 'error' ? 'alert' : 'status'}>
          {notice.message}
        </p>
      )}

      {activeTab === 'personal' ? (
        <form className={styles.contentGrid} id='personal-panel' role='tabpanel' aria-labelledby='personal-tab' onSubmit={handlePersonalSubmit}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>
              <HiOutlineUserCircle />
            </span>
            <div>
              <h3 className={styles.cardTitle}>Thông tin cá nhân</h3>
              <p className={styles.cardSubtitle}>Cập nhật thông tin để đặt phòng nhanh hơn</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <Field label='Họ và tên đệm'>
              <input
                className={styles.input}
                value={form.lastName}
                onChange={(e) => handleFormChange('lastName', e.target.value)}
                placeholder='Nhập họ và tên đệm'
              />
            </Field>

            <Field label='Tên'>
              <input
                className={styles.input}
                value={form.firstName}
                onChange={(e) => handleFormChange('firstName', e.target.value)}
                placeholder='Nhập tên'
              />
            </Field>

            <Field label='Ngày sinh'>
              <input
                className={styles.input}
                type='date'
                value={form.dateOfBirth}
                onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
              />
            </Field>

            <Field label='Giới tính'>
              <select
                className={styles.input}
                value={form.gender}
                onChange={(e) => handleFormChange('gender', e.target.value)}
              >
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </Field>

            <Field label='Email'>
              <input
                className={styles.input}
                type='email'
                value={form.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                placeholder='Nhập email'
              />
            </Field>

            <Field label='Số điện thoại'>
              <input
                className={styles.input}
                value={form.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder='Nhập số điện thoại'
              />
            </Field>

            <Field label='Địa chỉ' fullWidth>
              <input
                className={styles.input}
                value={form.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                placeholder='Nhập địa chỉ'
              />
            </Field>
          </div>
        </section>
        <div className={styles.actionBar}>
          <button className={styles.cancelBtn} type='button' onClick={() => setForm(savedForm)}>
            Hủy
          </button>
          <button className={styles.saveBtn} type='submit'>
            Lưu thông tin
          </button>
        </div>
        </form>
      ) : (
        <form className={styles.contentGrid} id='password-panel' role='tabpanel' aria-labelledby='password-tab' onSubmit={handlePasswordSubmit}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}><HiOutlineLockClosed /></span>
            <div>
              <h3 className={styles.cardTitle}>Bảo mật tài khoản</h3>
              <p className={styles.cardSubtitle}>Đổi mật khẩu định kỳ để bảo vệ tài khoản</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <Field label='Mật khẩu hiện tại' fullWidth>
              <input
                className={styles.input}
                type='password'
                value={passwords.current}
                required
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                placeholder='Nhập mật khẩu hiện tại'
              />
            </Field>

            <Field label='Mật khẩu mới'>
              <input
                className={styles.input}
                type='password'
                value={passwords.next}
                required
                onChange={(e) => handlePasswordChange('next', e.target.value)}
                placeholder='Nhập mật khẩu mới'
              />
            </Field>

            <Field label='Xác nhận mật khẩu mới'>
              <input
                className={styles.input}
                type='password'
                value={passwords.confirm}
                required
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                placeholder='Nhập lại mật khẩu mới'
              />
            </Field>
          </div>

          <div className={styles.securityNote}>
            Mật khẩu tối thiểu 8 ký tự, bao gồm chữ cái in hoa, chữ thường và số để đảm bảo an toàn
            cho tài khoản của bạn.
          </div>
        </section>
        <div className={styles.actionBar}>
          <button className={styles.cancelBtn} type='button' onClick={() => setPasswords({ current: '', next: '', confirm: '' })}>
            Xóa nội dung
          </button>
          <button className={styles.saveBtn} type='submit'>
            Đổi mật khẩu
          </button>
        </div>
        </form>
      )}
    </main>
  )
}

export default Page
